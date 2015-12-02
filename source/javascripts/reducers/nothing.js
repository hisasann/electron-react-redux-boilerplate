// Updates error message to notify about the failed fetches.
export default function nothing(state = 'nothing', action = {}) {
  console.log('nothing ', action.type, state);

  return state;
}