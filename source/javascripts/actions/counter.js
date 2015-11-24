export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

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