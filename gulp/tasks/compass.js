import gulp from 'gulp';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

import configs from '../config';
const config = configs.compass;

gulp.task('compass', function() {
  gulp
    .src([config.design.src])
    .pipe($.plumber())
    .pipe($.compass({
      config_file: './config.rb',
      css: config.design.css,
      sass: config.design.sass,
      bundle_exec: true
    }));

  return gulp
    .src([config.development.src])
    .pipe($.plumber())
    .pipe($.compass({
      config_file: './config.rb',
      css: config.development.css,
      sass: config.development.sass,
      bundle_exec: true
    }));
});
