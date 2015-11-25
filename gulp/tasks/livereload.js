import browserSync from 'browser-sync';
let bs = browserSync.create();

import gulp from 'gulp';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

import configs from '../config';
const config = configs.browserSync;

gulp.task('serve', () => {
    bs.watch('build/**/*.html').on('change', bs.reload);
    bs.watch('build/**/*.js').on('change', bs.reload);
    bs.watch('build/**/*.css').on('change', bs.reload);
    bs.init(config)

});
