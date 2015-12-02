import { CALL_API, Schemas } from '../middleware/api'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'


function fetchUser() {
  return {
    [CALL_API]: {
      types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ]
    }
  }
}

export function loadUser() {
  console.log('action/counter loadUser');

  // ajax処理を想定
  return (dispatch, getState) => {
    return dispatch(fetchUser())
  }
}


// Action
export function increment() {
  console.log('action/counter increment');

  return {
    type: INCREMENT_COUNTER
  }
}

export function decrement() {
  console.log('action/counter decrement');

  return {
    type: DECREMENT_COUNTER
  }
}

// Action Creater
export function incrementIfOdd() {
  console.log('action/counter incrementIfOdd');

  return (dispatch, getState) => {
    console.log(getState())
    const { counter } = getState()

    if (counter % 2 === 0) {
      return
    }

    dispatch(increment())
  }
}

export function incrementAsync(delay = 1000) {
  console.log('action/counter incrementAsync');

  return dispatch => {
    setTimeout(() => {
      dispatch(increment())
    }, delay)
  }
}