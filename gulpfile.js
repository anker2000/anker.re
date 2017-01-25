var gulp		= require('gulp'),
	livereload	= require('gulp-livereload'),
	watch 		= require('gulp-watch'),
	sass		= require('gulp-sass'),
	gutil 		= require('gulp-util'),
	uglify 		= require('gulp-uglify'),
	concat 		= require('gulp-concat'),
	install 	= require("gulp-install"),
	sourcemaps	= require("gulp-sourcemaps"),
 	gulp = require('gulp');
 

gulp.src(['./package.json'])
  .pipe(install());
// Styles Task
// Uglifies
gulp.task('styles', function() {

	'use strict';

	// return sass('source/scss/', { sourcemap: true })
	// 	.on('error', function (err) {
	// 	    gutil.log(gutil.colors.red(err.message));
	// 	    gutil.beep();
	// 	})
	//     .pipe(gulp.dest('./build/css'))
	//     .pipe(livereload());
	 gulp.src('source/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        // .pipe(plugins.autoprefixer())
        .pipe(gulp.dest('build/css'))
        .pipe(livereload());

});

// Scripts Task
gulp.task('scripts', function() {

	'use strict';

	gulp.src('source/js/**/*.js')
		.pipe(sourcemaps.init())
			
			.pipe(uglify().on('error', gutil.log))
			.pipe(concat("site.js"))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('build/js'))
		.pipe(livereload())
		.on('error', function (err) {
		    gutil.log(gutil.colors.red(err.toString()));
		    gutil.beep();
		});
});
gulp.task('html', function() {

	'use strict';

	gulp.src(['source/*.html'],['source/*.htm'])
		.pipe(gulp.dest('build/'))
		.pipe(livereload())
		.on('error', function (err) {
		    gutil.log(gutil.colors.red(err.toString()));
		    gutil.beep();
		});
});
gulp.task('json', function() {
	gulp.src(['source/feeds/*.json'])
		.pipe(gulp.dest('build/feeds'))
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
	gulp.watch('source/js/*.js', ['scripts']);
	gulp.watch('source/scss/**/**/**/**/*.scss', ['styles']);
	gulp.watch('source/*.html',['html']);
	console.log("Running Watch");
});
gulp.task('fonts', function() {
    return gulp.src(['source/scss/fonts/**/*.woff','source/scss/fonts/**/*.woff2','source/scss/fonts/**/*.eot','source/scss/fonts/**/*.otf','source/scss/fonts/**/*.ttf','source/scss/fonts/**/*.svg'])
            .pipe(gulp.dest('./build/css/fonts/'));
});

gulp.task('default', ['styles', 'scripts', 'fonts', 'watch']);

