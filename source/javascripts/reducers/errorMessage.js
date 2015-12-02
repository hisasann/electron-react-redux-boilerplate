import { RESET_ERROR_MESSAGE } from '../actions/error'

// Updates error message to notify about the failed fetches.
export default function errorMessage(state = null, action = {}) {
  const { type, error } = action;
  console.log('errorMessage: ', type, error);

  if (type === RESET_ERROR_MESSAGE) {
    return null;
  }

  if (error) {
    return error;
  }

  return state;
}