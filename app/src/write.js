'use strict';

var files = require('../files.json');
var path = require('path');
var yosay = require('yosay');
var chalk = require('chalk');

/* Process files */
module.exports = function () {
  var _ = this._;

  // Copy static files
  _.forEach(files.staticFiles, function(src) {
    this.fs.copy(this.templatePath(src),  this.destinationPath(src));
  }.bind(this));

  // Copy dot files
  _.forEach(files.staticResourceMeta, function(src) {
    this.fs.copy(this.templatePath(src),  this.destinationPath('../src/staticresources/' + this.props.staticResource + '.resource-' + src));
    // this.log(yosay(
    //   chalk.red('Static Resource Meta:') + '\n' +
    //   chalk.yellow( src )
    // ));

  }.bind(this));

  // Copy dot files
  _.forEach(files.dotFiles, function(src) {
    this.fs.copy(this.templatePath(src),  this.destinationPath('.' + src));
  }.bind(this));

  // Copy files formatted (format.js) with options selected in prompt
  _.forEach(this.technologiesLogoCopies, function(src) {
    this.fs.copy(this.templatePath(src),  this.destinationPath(src));
  }.bind(this));

  _.forEach(this.partialCopies, function(value, key) {
    this.fs.copy(this.templatePath(key),  this.destinationPath(value));
  }.bind(this));

  _.forEach(this.styleCopies, function(value, key) {
    this.fs.copy(this.templatePath(key),  this.destinationPath(value));
  }.bind(this));

  // Create files with templates
  var basename;
  var src;

  _.forEach(files.templates, function(dest) {
    basename = path.basename(dest);
    src = dest.replace(basename, '_' + basename);
    // this.log(yosay(
    //   chalk.red('Templates:') + '\n' +
    //   chalk.yellow( basename ) + '\n' +
    //   chalk.yellow( src )
    // ));
    this.fs.copyTpl(this.templatePath(src),  this.destinationPath(dest), this)
  }.bind(this));
};
