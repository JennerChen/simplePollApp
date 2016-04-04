var gulp = require('gulp');
//new one for mini css
// var cssnano = require('gulp-cssnano');
//old one
//var minifyCss = require('gulp-minify-css');
var connect = require('gulp-connect');

gulp.task('default', ['webserver']);
gulp.task('webserver', function () {
	connect.server({
		root: '.',
		port: 9090,
		// livereload: true
	});
});
