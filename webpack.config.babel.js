import autoprefixer      from 'autoprefixer';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlPlugin        from 'html-webpack-plugin';
import path              from 'path';
import webpack           from 'webpack';

const isProd = process.env.NODE_ENV === 'production';



//////////////////////// FILEPATH ///////////////////////
/////////////////////////////////////////////////////////
const imagesFolder = 'public/assets/img/',
      buildFolder  = 'dist',
      sourceFolder = 'src',
      PATHS = {
        build        : path.resolve(__dirname, buildFolder),
        src          : path.resolve(__dirname, sourceFolder),
        node_modules : path.resolve(__dirname, 'node_modules'),
        appJS        : path.resolve(__dirname, `${sourceFolder}/index.js`),
        indexHTML    : path.resolve(__dirname, `${sourceFolder}/index.html`)
      };



//////////////////////// PLUGINS ////////////////////////
/////////////////////////////////////////////////////////
const HtmlPluginOptions = {
  template: PATHS.indexHTML,
  minify: {
    collapseWhitespace: true
  },
  hash: true
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
  autoprefixer,
  new HtmlPlugin(HtmlPluginOptions),
  // new ExtractTextPlugin(ExtractTextPluginOptions),
  new webpack.HotModuleReplacementPlugin()
];

const pluginsProd = [
  require('autoprefixer'),
  // new HtmlPlugin(HtmlPluginOptions),
  // new ExtractTextPlugin(ExtractTextPluginOptions)
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

const styles = {
  test: /\.scss$/,
  use: ['style-loader', 'css-loader?sourceMap', postcss, scss]
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

const html = {
  test: /\.(html)$/,
  use: {
    loader: 'html-loader',
    options: {
      attrs: ['img:src', 'link:href']
    }
  }
};



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
