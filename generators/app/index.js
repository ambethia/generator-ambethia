var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  writing: {
    webpack: function() {
      this.fs.copy(
        this.templatePath('webpack.config.babel.js'),
        this.destinationPath('webpack.config.babel.js')
      );
    },
    packageJSON: function() {
      this.fs.copy(
        this.templatePath('package.json'),
        this.destinationPath('package.json')
      );
    },
    dotfiles: function() {
      this.fs.copy(
        this.templatePath('.*'),
        this.destinationRoot()
      );
    },
    styles: function() {
      this.fs.copy(
        this.templatePath('*.scss'),
        this.destinationPath('src/styles')
      );
    },
    scripts: function() {
      this.fs.copy(
        this.templatePath('index.jsx'),
        this.destinationPath('src/index.jsx')
      );

      this.fs.copy(
        this.templatePath('App.jsx'),
        this.destinationPath('src/components/App.jsx')
      );
    },
    html: function() {
      this.fs.copyTpl(
        this.templatePath('index.tpl.html'),
        this.destinationPath('src/index.tpl.html'), {
          title: this.appname
        }
      );
    }
  },

  install: function() {
    var devDependencies = [
      'autoprefixer',
      'babel',
      'babel-core',
      'babel-eslint',
      'babel-loader',
      'babel-plugin-lodash',
      'babel-plugin-react-transform',
      'css-loader',
      'eslint',
      'eslint-plugin-react',
      'extract-text-webpack-plugin',
      'file-loader',
      'html-webpack-plugin',
      'postcss-loader',
      'react-transform-hmr',
      'sass-loader',
      'style-loader',
      'url-loader',
      'webpack',
      'webpack-dev-server',
      'webpack-merge'
    ];

    dependencies = [
      'lodash',
      'react',
      'react-dom'
    ];

    this.npmInstall(
      devDependencies, {
        'saveDev': true
      }
    );

    this.npmInstall(
      dependencies, {
        'save': true
      }
    );
  },

  end: function() {
    this.spawnCommandSync('git', ['init']);
    this.spawnCommandSync('git', ['add', '--all']);
    this.spawnCommandSync('git', ['commit', '-m', '"Init"']);
  }
});
