import {
  REMOVE_FORM,
  DISPLAY_FORM
} from '../actions/ui_actions';

import {
  RECEIVE_CURRENT_USER
} from '../actions/session_actions';

const uiReducer = (oldState = {form: null}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case REMOVE_FORM:
      return {form: null};
    case DISPLAY_FORM:
      return { form: action.form };
    case RECEIVE_CURRENT_USER:
      return {form: null};
    default:
      return oldState;
  }
};

export default uiReducer;
