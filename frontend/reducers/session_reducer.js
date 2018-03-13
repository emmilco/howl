import { merge } from 'lodash';

import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_HOMEPAGE_ARTICLES } from '../actions/article_actions';

const sessionReducer = (oldState = {currentUser: null}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
  case RECEIVE_CURRENT_USER:
    const newState = merge({}, oldState);
    newState.currentUser = action.user;
    return newState;
  case RECEIVE_HOMEPAGE_ARTICLES:
    return merge({}, oldState, {
      homepage_articles_index: action.homepage_articles_index,
      homepage_authors_index: action.homepage_authors_index
    });
  default:
    return oldState;
  }
};

export default sessionReducer;
