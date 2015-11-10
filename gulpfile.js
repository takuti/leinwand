var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');

gulp.task('compile',
	[
		'compile-es6',
		'compile-sass',
		'compile-html'
	]
);

gulp.task('compile-es6', function() {
	gulp.src('src/**/*.js')
			.pipe(babel({ presets: ['es2015'] }))
			.pipe(gulp.dest('app/'));
});

gulp.task('compile-sass', function() {
	gulp.src('src/**/*.scss')
			.pipe(sass())
			.pipe(gulp.dest('app/'));
});

gulp.task('compile-html', function() {
	gulp.src('src/**/*.html')
			.pipe(gulp.dest('app/'));
});