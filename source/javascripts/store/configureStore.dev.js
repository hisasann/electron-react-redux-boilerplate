import { createStore, applyMiddleware, compose } from 'redux'
import { reduxReactRouter } from 'redux-router'
import DevTools from '../containers/DevTools'
import createHistory from 'history/lib/createHashHistory'
//import createHistory from 'history/lib/createBrowserHistory'
//import { createHistory } from 'history'
import routes from '../routes'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import logger from 'redux-logger'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/index'

const finalCreateStore = compose(
  applyMiddleware(thunk, api, logger()),
  reduxReactRouter({ routes, createHistory }),
  applyMiddleware(createLogger()),
  DevTools.instrument()
)(createStore)

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}