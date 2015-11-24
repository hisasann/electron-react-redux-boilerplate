import url from 'url';

module.exports = {
  browserSync: {
    port: 4567,
    server: {
      baseDir: './build/',
      middleware: [
        (req, res, next) => {
          const fileName = url.parse(req.url);

          // リロード時に404にならないようにrewrite
          if(/\/(routing|factor|cv|imagescale)/.test(fileName.pathname)){
            req.url = '/index.html';
          }

          return next();
        }
      ]
    }
  },
  browserify: {
    input: './source/javascripts/*.js',
    output: './build/javascripts/'
  },
  jsLibConcat: {
    name: 'lib.js',
    srcs: [
      './bower_components/PreloadJS/lib/preloadjs-0.6.1.combined.js',
      './bower_components/TweenJS/lib/tweenjs-0.6.1.combined.js',
      './bower_components/SoundJS/lib/soundjs-0.6.1.min.js',
      './bower_components/EaselJS/lib/easeljs-0.7.1.min.js',
      './source/javascripts/lib/particleEmitterJs-0.5.0.js',
      './source/javascripts/lib/stats.min.js',
      './bower_components/eventemitter2/lib/eventemitter2.js',
      './bower_components/jquery/dist/jquery.js',
      './bower_components/velocity/velocity.js',
      './bower_components/lodash/lodash.js'
    ],
    dest: './build/javascripts/'
  },
  watch: {
    js: './source/javascripts/**/*.js',
    sass: './source/stylesheets/**/*.scss',
    css: './source/stylesheets/**/*.css'
  },
  electron: {
    browserProcess: ['./main.js', './build/browser/**/*.js'],
    rendererProcess: ['./build/javascripts/**/*.js', './build/stylesheets/**/*.css', './build/renderer/**/*.html']
  },
  compass: {
    design: {
      src: './source/stylesheets/style.scss',
      css: 'source/stylesheets',
      sass: 'source/stylesheets'
    },
    development: {
      src: './source/stylesheets/development.scss',
      css: 'source/stylesheets',
      sass: 'source/stylesheets'
    }
  },
  cssConcat: {
    name: 'all.css',
    srcs: ['./source/stylesheets/normalize.css', './source/stylesheets/style.css', './source/stylesheets/development.css'],
    dest: './build/stylesheets/'
  }
};
