export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export function resetErrorMessage() {
  console.log('action/error resetErrorMessage');

  return {
    type: RESET_ERROR_MESSAGE
  };
}

export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE';

export function showErrorMessage(message) {
  console.log('action/error showErrorMessage');

  return {
    type: SHOW_ERROR_MESSAGE,
    error: message
  }
}

export function showErrorMessageDelayed(message, delay = 1000) {
  console.log('action/error showErrorMessageDelayed');

  return dispatch => {
    setTimeout(() => {
      dispatch(showErrorMessage(message));
    }, delay);
  };
}