import gulp from 'gulp';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

import configs from '../config';
const config = configs.cssConcat;

gulp.task('css-concat', function() {
  return gulp
    .src(config.srcs)
    .pipe($.concat(config.name))
    .pipe($["if"](global.isRelease, $.csso()))
    .pipe(gulp.dest(config.dest))
    .pipe($.size());
});
