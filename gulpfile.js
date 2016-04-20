var gulp = require("gulp");
var shell = require("gulp-shell");

gulp.task("webpack-bundle", shell.task('webpack --progress --colors --watch'));


gulp.task("bundle", shell.task('webpack --progress --colors --watch'));

gulp.task("server", shell.task('webpack-dev-server --progress --colors'));

gulp.task("serve", ["bundle","server"], function() {
	console.log('Server Started');
});