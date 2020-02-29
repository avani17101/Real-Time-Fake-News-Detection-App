var gulp = require('gulp');

gulp.paths = {
  tssrc: [
    '**/*.ts',
    '!node_modules/**/*',
    '!bundles/**/*',
    '!typings/**/*',
  ],
};

require('require-dir')('./gulp-tasks');

var clean = require('gulp-rimraf');
gulp.task('clean', function () {
  return gulp.src('bundles', {read: false})
    .pipe(clean());
});

var nano = require('gulp-cssnano');
var rename = require('gulp-rename');

gulp.task('bundle-css', function() {
  return gulp.src('./*.css')
    .pipe(nano({zindex: false}))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('bundles'));
});

gulp.task('default', function () {
  gulp.start('lint');
});
