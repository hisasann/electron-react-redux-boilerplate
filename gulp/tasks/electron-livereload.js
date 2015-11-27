import gulp from 'gulp';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

import configs from '../config';
const config = configs.electron;

import electronConnect from 'electron-connect';
const electron = electronConnect.server.create();

// via http://qiita.com/Quramy/items/90d61ff37ca1b95a7f6d

gulp.task('electron-serve', function () {
  // Electronの起動
  electron.start();

  // BrowserProcess(MainProcess)が読み込むリソースが変更されたら, Electron自体を再起動
  gulp.watch(config.browserProcess, function() {
    console.log('BrowserProcess reload');
    electron.restart();
  });

  // RendererProcessが読み込むリソースが変更されたら, RendererProcessにreloadさせる
  gulp.watch(config.rendererProcess, function() {
    console.log('RendererProcess reload');
    electron.reload();
  });
});