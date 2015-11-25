:lipstick: electron-react-redux-router :lipstick:
===============

## Overview

Node.js + Babel 6 + React + Redux + Webpack + Gulp + Electron

## Electron

### Livereload

1. RendererProcessで読み込んでいるコードが変更されたら, 画面をreload.
1. BrowserProcess(MainProcess, main.jsなど)で動作するコードが変更されたら, RendererProcessもろともBrowserProcessを再起動

使ったnpmモジュールは、[Quramy/electron-connect](https://github.com/Quramy/electron-connect)です。

```javascript
import gulp from 'gulp';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

import configs from '../config';
const config = configs.electron;

import electronConnect from 'electron-connect';
const electron = electronConnect.server.create();

// via http://qiita.com/Quramy/items/90d61ff37ca1b95a7f6d

gulp.task('serve', function () {
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
```

```html
<!-- gulp側で立てたserverへ接続する -->
<script>require('electron-connect').client.create()</script>
```

このhtmlは本番環境では不要なので、[gulp-useref](https://www.npmjs.com/package/gulp-useref)などで消去するとよい

via [http://qiita.com/Quramy/items/90d61ff37ca1b95a7f6d](http://qiita.com/Quramy/items/90d61ff37ca1b95a7f6d)

## React / Flux

flux-diagram.png
flux-unidir-ui-arch.jpg

one-way data flow

via [React.js architecture - Flux VS Reflux](http://blog.krawaller.se/posts/react-js-architecture-flux-vs-reflux/)

## React / Redux

redux-unidir-ui-arch.jpg

### Entry Point

[Read Me | Redux](http://redux.js.org/index.html)

### Action Creators and Constants

<Provider>

ルートのコンポーネントとしてreactコンポーネントをラップする

propsとしてstoreを受け取りreduxのオブジェクトに登録する

渡されたstoreはconnect()でラップされたコンポーネントを通じて共有される

### Reducers

reduxではstateをreduxオブジェクトが内部的に管理する

よくあるfluxのstoreのstateを変更する部分(callbacks)のみを切り出したのがreducer

reducerは現在のstateとactionを受け取り、新しいstateを返す関数

reducerは、アプリケーションの規模に応じてstateを部分的に担当するreducerとして分割することもできる

stateの部分毎に複数のreducerに分担する場合は、combineReducers()を利用すると便利

[JavaScript - Reduxにおけるreducer分割とcombineReducersについて - Qiita](http://qiita.com/kuy/items/59c6d7029a10972cba78)

### Container Components

<Provider>でwrapするrootとなるcomponent

### Presentational Components

各パーツごとのcomponents

TODOアプリをReduxでつなぐチュートリアル

[Usage with React | Redux](http://rackt.org/redux/docs/basics/UsageWithReact.html)

ReactとReduxを接続する手順としては、

1. rootのcomponentを **<provider>** でwrapする（react-redux/Provider）
1. wrapしたcomponentを[rackt/react-redux](https://github.com/rackt/react-redux)のconnect関数でReactとReduxを接続する
1. connect()することで、dispatch関数がpropにレシーブされ、stateとstore.getState()がbindされる

サンプルのソースコード: [Example: Todo List | Redux](http://rackt.org/redux/docs/basics/ExampleTodoList.html)

```javascript
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

[redux/index.js at master · rackt/redux](https://github.com/rackt/redux/blob/master/examples/counter/index.js)

```javascript
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../components/Counter'
import * as CounterActions from '../actions/counter'

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```

### connect()

connectメソッドを使って、共通のpropsを持つ親コンポーネントを作れる connectメソッドを使ってラップされたコンポーネントはdispatch, props, state を受け取ることができるようになる ラップしたコンポーネントが対象、子孫コンポーネントには共有されない 計画なくどの階層のコンポーネントでもラップしてしまうと 各コンポーネントのコミュニケーションの流れが壊れるのでラップしすぎないように注意が必要

Reduxのグローバルな状態とコンポーネントのプロパティをマップする関数と、コンポーネントのプロパティをReduxのActionにマップする関数がある

redux#bindActionCreators()はActionを返すメソッド群をそれぞれdispatch()でラップし、さらに1つのオブジェクトにまとめあげるユーティリティ

[redux/App.js at master · rackt/redux](https://github.com/rackt/redux/blob/master/examples/counter/containers/App.js)

### bindActionCretors()

Actionをpropsとして、バインドする

[bindActionCreators | Redux](http://redux.js.org/docs/api/bindActionCreators.html)

### 非同期でActionを呼び出す場合

```javascript
export function showErrorMessageDelayed(message, delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(showErrorMessage(message));
    }, delay);
  };
}
```

middlewareとして[gaearon/redux-thunk](https://github.com/gaearon/redux-thunk)を追加します

```javascript
import thunk from 'redux-thunk';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ routes, createHistory }),
  applyMiddleware(createLogger()),
  DevTools.instrument()
)(createStore);
```

つまり、Ajaxをするならこのタイミング

## React Router

URLのパスとcomponentの構造をマッピングするライブラリ

```html
<Route path="/" component="App">
  <IndexRoute component="Home">
  <Route path="home" component="Home"/>
  <Route path="profile" component="Profile"/>
</Route>
```

[rackt/react-router](https://github.com/rackt/react-router)

URLを変更するには、

```html
import {Link} from 'react-router';

<Link to='/home'>Home</Link>
```

URLが変更されたときに、パスを取得するには、

```javascript
function mapStateToProps(state) {
  return {
    pathname: state.router.location.pathname
  }
}
```

のように渡ってくるので、これをpropsとして使う

プログラムからroutingする場合は、

```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

class SearchBox extends Component {
   handleClick() {
       this.props.pushState(null, '/to/other/route');
   }

   render() {
      // ........
   }
}

function selector(state) { //... }
export default connect(
  selector,

  // Use an action creator for navigation
  { pushState }
)(SearchBox);
```

[How/where can I access router.transitionTo? · Issue #79 · rackt/redux-router](https://github.com/rackt/redux-router/issues/79)

こうすればいける

## Redux Router

react-routerの機能は十分だが、現在表示しているページという"状態"がアプリケーションに登場する。これもできればstoreに押し込めたい。ということで登場したライブラリ

[rackt/redux-router](https://github.com/rackt/redux-router)

## Tools

* ES6
* Gulp
* Webpack(browserify)
* Sass
* Compass
* React
* Redux
* Electron

## Getting Started

set up the necessary files.

    npm i

and
    
    bower i

and

    bundle install  --path vendor/bundle

run a gulp

    npm run local

if you want to release build.

    npm run product

Please enter the following URL to launch the browser.

    http://localhost:4567/

## Directory Structure

    ├── gulp
    │   └── tasks
    ├── node_modules
    ├── build
    │   ├── images
    │   ├── javascripts
    │   └── stylesheets
    ├── source
    │   ├── javascripts
    │   └── stylesheets
    └── vendor
        └── ruby modules

## Author

[hisasann](https://github.com/hisasann)

:arrow_up: enjoy! :arrow_up:
