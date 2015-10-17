var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('compile',
	[
		'compile-sass',
		'compile-html',
		'compile-js'
	]
);

gulp.task('compile-sass', function() {
	gulp.src('src/**/*.scss')
			.pipe(sass())
			.pipe(gulp.dest('app/'));
});

gulp.task('compile-html', function() {
	gulp.src('src/**/*.html')
			.pipe(gulp.dest('app/'));
});

gulp.task('compile-js', function() {
	gulp.src('src/**/*.js')
			.pipe(gulp.dest('app/'));
});