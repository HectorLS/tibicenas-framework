# :floppy_disk: Tibicenas Framework

## React + Sass with Webpack
[![Tibicenas version][tibicenas-badge]][url-shields]
[![nodejs dependencies][david-dm-badge]][david-dm-url]
[![nodejs devDependencies][david-dm-badge--dev]][david-dm-url]

### Keep your forked repo up to date !

1.Fork the repository and clone it in locally

```bash
$ git clone git@github.com:YOUR-USERNAME/YOUR-FORKED-REPO.git
```

2.Add remote from original repository in your forked repository:
```bash
$ cd into-your-repos-folder/cloned/fork-repo
$ git remote add upstream git://github.com/ORIGINAL-USER/REPO-YOU-FORKED-FROM.git
$ git fetch upstream
```

3.Updating your fork from original repo to keep up with their changes:
```bash
$ git pull upstream master
```


### User Yarn or NPM
#### Install all the dependencies defined in a package.json file.

```bash
$ yarn install
```

```bash
$ npm install
```

#### Add a package to use in your current package.
(remember to use the `--dev` flag if you need to save it as a development dependency)
Yarn has the `--save` flag as a default.
```bash
$ yarn add <package-name> --dev
```

```bash
$ npm install <package-name> --save-dev
```

#### Removes an unused package from your current package.
```bash
$ yarn remove <package-name>
```

```bash
$ npm uninstall <package-name>
```

[tibicenas-badge]: https://img.shields.io/badge/tibicenas-v1.0.0-blue.svg
[url-shields]: https://shields.io/

[logo-webpack]: https://cdn.worldvectorlogo.com/logos/webpack.svg
[logo-express]: https://cdn.worldvectorlogo.com/logos/express-109.svg
[logo-sass]: https://cdn.worldvectorlogo.com/logos/sass-1.svg
[logo-react]: https://cdn.worldvectorlogo.com/logos/react.svg
[logo-react-router]: https://cdn.worldvectorlogo.com/logos/react-router.svg
[logo-redux]: https://cdn.worldvectorlogo.com/logos/redux.svg

[url-react]: https://facebook.github.io/react/

[david-dm-badge]: https://david-dm.org/hectorLS/tibicenas-framework.svg
[david-dm-badge--dev]: https://david-dm.org/hectorLS/tibicenas-framework/dev-status.svg
[david-dm-url]: https://david-dm.org/
