import gulp from 'gulp';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

import configs from '../config';
const config = configs.watch;

gulp.task('watch', function() {
  gulp.watch(config.js, { debounceDelay: 100 }, ['browserify-webpack']);
  gulp.watch(config.sass, { debounceDelay: 100 }, ['compass']);
  return gulp.watch(config.css, { debounceDelay: 100 }, ['css-concat']);
});
