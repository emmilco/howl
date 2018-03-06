import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const sessionReducer = (oldState = {currentUser: null}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
  case RECEIVE_CURRENT_USER:
    const newState = {};
    newState.currentUser = action.user;
    return newState;
  default:
    return oldState;
  }
};

export default sessionReducer;
