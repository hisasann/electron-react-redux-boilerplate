//import { createStore, applyMiddleware } from 'redux'
//import thunk from 'redux-thunk'
//import logger from 'redux-logger'
//import reducer from '../reducers/index'
//import Env from '../env/env'
//
//const middleware = Env.envName === 'product' ?
//  [ thunk ] :
//  [ thunk, logger() ]
//
//const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
//
//export default function configureStore(initialState) {
//  const store = createStoreWithMiddleware(reducer, initialState)
//
//  if (module.hot) {
//    // Enable Webpack hot module replacement for reducers
//    module.hot.accept('../reducers', () => {
//      const nextReducer = require('../reducers')
//      store.replaceReducer(nextReducer)
//    })
//  }
//
//  return store
//}

import Env from '../env/env'

if (Env.envName === 'product') {
  module.exports = require('./configureStore.prod')
} else {
  module.exports = require('./configureStore.dev')
}
