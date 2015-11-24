import React from 'react'
import { Router, Route, Link } from 'react-router'
import App from './containers/App'

//<Route path="/Users/yhisamatsu/_/js-dev/electron-redux-boilerplate/build/renderer/index.html" component={App}>
//<Route path="*" component={App}>
export default (
  <Route path="*" component={App}>
  </Route>
)