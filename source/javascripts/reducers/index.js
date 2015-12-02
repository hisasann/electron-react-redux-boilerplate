import { routerStateReducer as router } from 'redux-router'
import { combineReducers } from 'redux'
import counter from './counter'
import errorMessage from './errorMessage'
import nothing from './nothing'

// combineReducersで登録したものがactionのgetState()で取得が可能
const rootReducer = combineReducers({
  counter,
  errorMessage,
  nothing,
  router
})

export default rootReducer