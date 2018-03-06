import {
  REMOVE_FORM,
  DISPLAY_FORM
} from '../actions/ui_actions';

const uiReducer = (oldState = {form: "yep"}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case REMOVE_FORM:
      return {form: null};
    case DISPLAY_FORM:
      return { form: action.form };
    default:
      return oldState;
  }
};

export default uiReducer;
