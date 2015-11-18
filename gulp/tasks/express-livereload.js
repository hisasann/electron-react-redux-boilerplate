import gulp from 'gulp';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

import configs from '../config';
const config = configs.express;

import nodemon from 'gulp-nodemon';
import browserSync from 'browser-sync';

// via http://mid0111.hatenablog.com/entry/2015/08/19/200657

gulp.task('browsersync', function() {
  browserSync.init({
    files: ['public/**/*.*'], // BrowserSyncにまかせるファイル群
    proxy: 'http://localhost:3000',  // express の動作するポートにプロキシ
    port: 4000,  // BrowserSync は 4000 番ポートで起動
    open: false  // ブラウザ open しない
  });
});

gulp.task('serve', ['browsersync'], function() {
  nodemon({
    script: './bin/www',
    ext: 'js jade',
    ignore: [  // nodemon で監視しないディレクトリ
      'node_modules/**/*',
      'bower_components/**/*',
      'gulp/**/*',
      'bin/**/*',
      'public/**/*',
      'test/**/*'
    ],
    watch: [
      'routes',
      'views'
    ],
    env: {
      'NODE_ENV': 'development'
    },
    stdout: false  // Express の再起動時のログを監視するため
  }).on('readable', function() {
    this.stdout.on('data', function(chunk) {
      if (/^Express\ server\ listening/.test(chunk)) {
        // Express の再起動が完了したら、reload() でBrowserSync に通知。
        // ※Express で出力する起動時のメッセージに合わせて比較文字列は修正
        browserSync.reload({ stream: false });
      }
      process.stdout.write(chunk);
    });
    this.stderr.on('data', function(chunk) {
      process.stderr.write(chunk);
    });
  });

  gulp
    .watch([config.css])
    .on('change', function(event) {
      browserSync.reload({ stream: true });
    });
  gulp
    .watch([config.js])
    .on('change', function(event) {
      browserSync.reload({ stream: false });
    });
});
