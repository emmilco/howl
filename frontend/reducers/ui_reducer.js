import {
  REMOVE_FORM,
  DISPLAY_FORM,
  TOGGLE_MENU,
  CLEAR_NEW_ARTICLE
} from '../actions/ui_actions';

import {
  RECEIVE_CURRENT_USER
} from '../actions/session_actions';

const uiReducer = (oldState = {form: null, menu: null}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case REMOVE_FORM:
      return {form: null};
    case DISPLAY_FORM:
      return { form: action.form };
    case TOGGLE_MENU:
      return { [action.menu]: !oldState[action.menu] };
    case RECEIVE_CURRENT_USER:
      return {form: null};
    case CLEAR_NEW_ARTICLE:
      return { newArticle: null };
    default:
      return oldState;
  }
};

export default uiReducer;
