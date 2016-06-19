var gulp = require('gulp');
var bs = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var sourceMaps = require('gulp-sourcemaps');

gulp.task('browserSync', function(){
	bs.init({
		server:{
			baseDir:'app'
		}
	})
});

gulp.task('watch', ['browserSync'],function(){
	gulp.watch('./app/css/**/*.css',bs.reload);
	gulp.watch('./app/js/**/*.js',bs.reload);
	gulp.watch('./app/**/*.html',bs.reload);
	console.log('watched');
});

gulp.task('default',['watch'],function(){
});

gulp.task('optimise',function(){
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(sourceMaps.init())
		.pipe(gulpIf('*.js',uglify()))
		.pipe(gulpIf('*.css',cssnano()))
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function(){
	return del.sync('dist');
});

gulp.task('build', function(){
	runSequence('clean:dist','optimise');
})