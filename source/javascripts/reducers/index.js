import { routerStateReducer as router } from 'redux-router'
import { combineReducers } from 'redux'
import counter from './counter'

const rootReducer = combineReducers({
  counter,
  router
})

export default rootReducer