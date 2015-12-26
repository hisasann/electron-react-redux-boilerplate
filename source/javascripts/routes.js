import React from 'react'
import { Router, Route, Link } from 'react-router'
import { createHistory, useBasename } from 'history'
import App from './containers/App'
import About from './containers/About'

const history = useBasename(createHistory)({
  basename: '/top'
})

// <Route path="/Users/yhisamatsu/_/js-dev/electron-redux-boilerplate/build/renderer/index.html" component={App}>
// 一番はじめのパスは上記のようになるので、*/で待ち構えている
// それ以外は基本的に相対パス、相対パスを使わないとパスの構造が変化して、画面遷移ができなくなるため
export default (
  <Router history={history}>
    {/* for electron */}
    <Route path="*/index.html" component={App}>
    </Route>
    {/* for web */}
    <Route path="/index.html" component={App}>
    </Route>

    <Route path="./routing" component={About}>
    </Route>
  </Router>
)