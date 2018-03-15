import { merge } from 'lodash';

import {
  RECEIVE_USER,
  RECEIVE_FOLLOW,
  REMOVE_FOLLOW,
  RECEIVE_FOLLOWERS,
  RECEIVE_FOLLOWEES
} from '../actions/user_actions';

import {
  RECEIVE_ARTICLE,
  RECEIVE_HOMEPAGE_ARTICLES
 } from '../actions/article_actions';

import { RECEIVE_ARTICLE_COMMENTS } from '../actions/comment_actions';

const usersReducer = (oldState = {}, action) => {
  switch (action.type) {

    case RECEIVE_USER:
    case RECEIVE_ARTICLE:
    return merge({}, oldState, {[action.user.id]: action.user});

    case RECEIVE_FOLLOWERS:
    return merge({}, oldState, action.users, {
      [action.id]: {followers_index: action.follows}
    });

    case RECEIVE_FOLLOWEES:
    return merge({}, oldState, action.users, {
      [action.id]: {followees_index: action.follows}
    });

    case RECEIVE_ARTICLE_COMMENTS:
    case RECEIVE_HOMEPAGE_ARTICLES:
      return merge({}, oldState, action.users);

    case RECEIVE_FOLLOW:
      return merge({}, oldState, {[action.id]: {following: true}});

    case REMOVE_FOLLOW:
      return merge({}, oldState, {[action.id]: {following: false}});
    default:
      return oldState;
  }
};

export default usersReducer;
