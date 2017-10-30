var gulp			= require('gulp'),
	livereload	= require('gulp-livereload'),
	watch 		= require('gulp-watch'),
	sass			= require('gulp-ruby-sass'),
	gutil 		= require('gulp-util'),
	uglify 		= require('gulp-uglify'),
	concat 		= require('gulp-concat');
	install 		= require("gulp-install");
	sourcemaps	= require("gulp-sourcemaps");
 
gulp.src(['./bower.json', './package.json'])
  .pipe(install());
// Styles Task
// Uglifies
gulp.task('styles', function() {

	'use strict';

	return sass('_/scss/', { sourcemap: true })
		.on('error', function (err) {
		    gutil.log(gutil.colors.red(err.message));
		    gutil.beep();
		})
	    .pipe(gulp.dest('./css/'))
	    .pipe(livereload());

});

// Scripts Task
gulp.task('scripts', function() {

	'use strict';

	gulp.src('_/js/**/*.js')
		.pipe(sourcemaps.init())
			
			.pipe(uglify().on('error', gutil.log))
			.pipe(concat("site.js"))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./js'))
		.pipe(livereload())
		.on('error', function (err) {
		    gutil.log(gutil.colors.red(err.toString()));
		    gutil.beep();
		});
});

// Watch Tasks
gulp.task('watch', function() {
	'use strict';

	livereload.listen();
	gulp.watch('_/js/*.js', ['scripts']);
	gulp.watch('_/js/**/*.js', ['scripts']);
	gulp.watch('_/scss/**/**/**/**/*.scss', ['styles']);
	gulp.watch('**/*.php').on('change', livereload.changed);

});
gulp.task('fonts', function() {
    return gulp.src(['_/scss/fonts/**/*.woff','_/scss/fonts/**/*.woff2','_/scss/fonts/**/*.eot','_/scss/fonts/**/*.otf','_/scss/fonts/**/*.ttf','_/scss/fonts/**/*.svg'])
            .pipe(gulp.dest('./css/'));
});

gulp.task('default', ['styles', 'scripts', 'watch', 'fonts']);

