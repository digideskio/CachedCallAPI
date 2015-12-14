var gulp = require('gulp')
var connect = require('gulp-connect')
var browserify = require('browserify')
var source = require('vinyl-source-stream')

gulp.task('connect', function () {
	connect.server({
		root: 'public',
		port: 4000
	})
});
gulp.task('browserify', function() {
    return browserify(['./app/app.js'
                        ,'./app/scripts/HomeController.js'
                        ,'./app/scripts/ContactController.js'])
        .bundle()
        .pipe(source('finalBuild.js'))
        .pipe(gulp.dest('./public/build/'));
});
gulp.task('watch', function () {
    gulp.watch('app/**/*.js', ['browserify'])
});
gulp.task('default', ['browserify','connect','watch'])
