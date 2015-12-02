function callApi() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    }, 1000)
  })
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('hisasann')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  console.log('api: ', action);
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { types } = callAPI

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi().then(
    (response) => {
      next(actionWith({
        type: successType,
        message: response
      }))
    },
    (error) => {
      next(actionWith({
        type: failureType
      }))
    })
}