import autoprefixer      from 'autoprefixer';
import DashboardPlugin   from 'webpack-dashboard/plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlPlugin        from 'html-webpack-plugin';
import path              from 'path';
import webpack           from 'webpack';

const isProd = process.env.NODE_ENV === 'production';



//////////////////////// FILEPATH ///////////////////////
/////////////////////////////////////////////////////////
const fontsFolder  = 'public/assets/fonts/',
      imagesFolder = 'public/assets/img/',
      buildFolder  = 'dist',
      sourceFolder = 'src',
      PATHS = {
        build        : path.resolve(__dirname, buildFolder),
        src          : path.resolve(__dirname, sourceFolder),
        node_modules : path.resolve(__dirname, 'node_modules'),
        appJS        : path.resolve(__dirname, `${sourceFolder}/app.js`),
        indexHTML    : path.resolve(__dirname, `${sourceFolder}/index.html`)
      };



//////////////////////// PLUGINS ////////////////////////
/////////////////////////////////////////////////////////
const IndexHtmlOptions = {
  template: PATHS.indexHTML,
  filename: 'index.html',
  minify: {
    collapseWhitespace: true
  },
  hash: true,
  inject: 'head',
  'files': {
    'css': [ '[name].bundle.css' ],
    'js': [ '[name].bundle.js'],
    'chunks': {
      'head': {
        'entry': '',
        'css': [ '[name].bundle.css' ]
      },
      'main': {
        'entry': '[name].bundle.js',
        'css': []
      },
    }
  }
};

const ExtractTextPluginOptions = {
  filename: '[name].bundle.css',
  disable: !isProd,
  allChunks: true,
  ignoreOrder: false
};

const devServerOptions = {
  contentBase: PATHS.build,
  compress: true,
  port: 6969,
  stats: 'errors-only',
  open: true,
  hot: true,
  openPage: ''
};

const pluginsDev = [
  new DashboardPlugin(),
  autoprefixer,
  new HtmlPlugin(IndexHtmlOptions),
  new ExtractTextPlugin(ExtractTextPluginOptions),
  new webpack.HotModuleReplacementPlugin()
];

const pluginsProd = [
  require('autoprefixer'),
  new HtmlPlugin(IndexHtmlOptions),
  new ExtractTextPlugin(ExtractTextPluginOptions)
];

var pluginsList = isProd ? pluginsProd : pluginsDev;



//////////////////////// LOADERS ////////////////////////
/////////////////////////////////////////////////////////
const postcss = {
  loader: 'postcss-loader',
  options: {
    sourceMap: 'inline',
    plugins() {
      return [autoprefixer({ browsers: 'last 3 versions' })];
    }
  }
};

const scss = {
  loader: 'sass-loader',
  options: {
    sourceMap: 'inline',
    includePaths: [PATHS.node_modules]
  }
}

const stylesDev  = ['style-loader', 'css-loader?sourceMap', postcss, scss];

const stylesProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', postcss, scss],
  publicPath: buildFolder
});

const styles = {
  test: /\.scss$/,
  use: isProd ? stylesProd : stylesDev
};

const javascript = {
  test: /\.(js|jsx)$/,
  use: 'babel-loader',
  exclude: /node_modules/
};

const images = {
  test: /\.(jpe?g|svg|png|gif)$/i,
  use: [
    `file-loader?name=${imagesFolder}[name].[ext]`
  ]
};

const fonts = {
  test: /\.(eot|ttf|woff|woff2)$/,
  use: [
    `file-loader?name=${fontsFolder}[name].[ext]`
  ]
}

const html = {
  test: /\.(html)$/,
  use: {
    loader: 'html-loader',
    options: {
      attrs: ['img:src', 'link:href']
    }
  }
};


// https://webpack.js.org/configuration/externals/
const externals = {
  Arrive              : 'arrive',
  Barba               : 'barba.js',
  bowser              : 'bowser',
  FiniteStatesMachine : 'javascript-state-machine',
  Headroom            : 'headroom.js',
  jQuery              : 'jQuery',
  lazysizes           : 'lazysizes',
  React               : 'react',
  Scrollbar           : 'smooth-scrollbar'
}


//////////////////////// WEBPACK ////////////////////////
/////////////////////////////////////////////////////////
const webpackConfig = {
  entry: {
    app: PATHS.appJS
  },
  output:  {
    path: PATHS.build,
    filename: '[name].bundle.js'
  },
  // externals: externals,
  module: {
    rules: [javascript, styles, images, html]
  },
  resolve: {
    modules: [PATHS.src, 'node_modules'],
  },
  devServer: devServerOptions,
  plugins: pluginsList
};

export default webpackConfig;
