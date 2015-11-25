import { routerStateReducer as router } from 'redux-router'
import { combineReducers } from 'redux'
import counter from './counter'
import errorMessage from './errorMessage'

const rootReducer = combineReducers({
  counter,
  errorMessage,
  router
})

export default rootReducer