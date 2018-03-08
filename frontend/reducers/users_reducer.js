import { merge } from 'lodash';

import {
  RECEIVE_ARTICLE
} from '../actions/article_actions';

const usersReducer = (oldState = {}, action) => {
  switch (action.type) {
    case RECEIVE_ARTICLE:
      return merge({}, oldState, {[action.user.id]: action.user});
    default:
      return oldState;
  }
};

export default usersReducer;
