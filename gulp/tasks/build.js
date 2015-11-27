import gulp from 'gulp';

import runSequence from 'run-sequence';

gulp.task('local', function() {
  global.isWatching = true;
  global.isRelease = false;

  gulp.src('./source/javascripts/env/local/env.js').pipe(gulp.dest('./source/javascripts/env/'));

  runSequence('js-lib-concat', 'browserify-webpack', 'compass', 'css-concat', 'watch', 'serve');
});

gulp.task('electron', function() {
  global.isWatching = true;
  global.isRelease = false;

  gulp.src('./source/javascripts/env/local/env.js').pipe(gulp.dest('./source/javascripts/env/'));

  runSequence('js-lib-concat', 'browserify-webpack', 'compass', 'css-concat', 'watch', 'electron-serve');
});

gulp.task('product', function() {
  global.isWatching = false;
  global.isRelease = true;

  gulp.src('./source/javascripts/env/product/env.js').pipe(gulp.dest('./source/javascripts/env/'));

  runSequence('js-lib-concat', 'browserify-webpack', 'compass', 'css-concat');
});
