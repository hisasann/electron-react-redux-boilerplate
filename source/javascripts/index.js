//import React from 'react'
//import { render } from 'react-dom'
//import { Provider } from 'react-redux'
//import { Router, Route, Link } from 'react-router'
//import App from './containers/App'
//import configureStore from './store/configureStore'
//
//const store = configureStore()
//
//render(
//  <Provider store={store}>
//    <Router>
//      <Route name="app" component={App} path="/" />
//    </Router>
//  </Provider>,
//  document.getElementById('root')
//);

import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root.dev'
import configureStore from './store/configureStore'

const store = configureStore()

render(
  <Root store={store} />,
  document.getElementById('root')
)
