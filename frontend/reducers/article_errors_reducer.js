import {
  RECEIVE_ARTICLE_ERRORS,
  RECEIVE_ARTICLE,
  REMOVE_ARTICLE,
  RECEIVE_HOMEPAGE_ARTICLES,
 } from '../actions/article_actions';

const articleErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ARTICLE_ERRORS:
      return action.errors;
    case RECEIVE_ARTICLE:
    case RECEIVE_HOMEPAGE_ARTICLES:
    case REMOVE_ARTICLE:
      return [];
    default:
      return oldState;
  }
};

export default articleErrorsReducer;
