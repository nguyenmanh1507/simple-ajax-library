'use strict';

var gulp = require('gulp'),
		jshint = require('gulp-jshint'),
		browserSync = require('browser-sync')
	;

gulp.task('lint', function() {
	return gulp.src('js/*.js')
					.pipe(jshint())
					.pipe(jshint.reporter('jshint-stylish'))
				;
});

gulp.task('js-watch', ['lint'], browserSync.reload);

gulp.task('serve', function() {
	browserSync.init({
		server: './'
	});

	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('js/*.js', ['js-watch']);
});

gulp.task('default', ['serve']);