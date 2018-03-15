import { merge } from 'lodash';

import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

import {
  RECEIVE_HOMEPAGE_ARTICLES,
  RECEIVE_ARTICLES_FOR_MANAGER,
  REMOVE_ARTICLE
} from '../actions/article_actions';

const sessionReducer = (oldState = {currentUser: null}, action) => {
  Object.freeze(oldState);
  const newState = merge({}, oldState);
  switch (action.type) {

  case RECEIVE_CURRENT_USER:
    newState.currentUser = action.user;
    return newState;

  case RECEIVE_HOMEPAGE_ARTICLES:
    return merge({}, oldState, {
      homepage_articles_index: action.homepage_articles_index,
      homepage_authors_index: action.homepage_authors_index
    });

  case RECEIVE_ARTICLES_FOR_MANAGER:
    return merge({}, oldState, {
      manager_articles_index: action.manager_articles_index
    });

  case REMOVE_ARTICLE:
    const manager = newState.manager_articles_index;
    manager.splice(manager.indexOf(action.id), 1);
    return newState;

  default:
    return oldState;
  }
};

export default sessionReducer;
