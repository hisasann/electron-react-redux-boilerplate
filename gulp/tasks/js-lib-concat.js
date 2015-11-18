import gulp from 'gulp';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

import configs from '../config';
const config = configs.jsLibConcat;

gulp.task('js-lib-concat', function() {
  return gulp
    .src(config.srcs)
    .pipe($.concat(config.name))
    .pipe($['if'](global.isRelease, $.uglify({
      preserveComments: 'some'
    })))
    .pipe(gulp.dest(config.dest))
    .pipe($.size());
});
