import { merge } from 'lodash';

import {
  REMOVE_FORM,
  DISPLAY_FORM,
  TOGGLE_MENU,
  CLEAR_NEW_ARTICLE,
  CLEAR_MENU
} from '../actions/ui_actions';

import {
  RECEIVE_CURRENT_USER
} from '../actions/session_actions';

const uiReducer = (oldState = {form: null, menu: false}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
    case REMOVE_FORM:
      return merge({}, oldState, {form: false, menu: false});
    case DISPLAY_FORM:
      return merge({}, oldState, { form: action.form });
    case TOGGLE_MENU:
      return merge({}, oldState, { menu: action.menu });
    case CLEAR_MENU:
      return merge ({}, oldState, { menu: false });
    case CLEAR_NEW_ARTICLE:
      return merge({}, oldState, { newArticle: false });
    default:
      return oldState;
  }
};

export default uiReducer;
