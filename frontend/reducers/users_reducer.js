import { merge } from 'lodash';

import {
  RECEIVE_USER,
  RECEIVE_FOLLOW,
  REMOVE_FOLLOW
} from '../actions/user_actions';

import { RECEIVE_ARTICLE } from '../actions/article_actions';

import { RECEIVE_ARTICLE_COMMENTS } from '../actions/comment_actions';

const usersReducer = (oldState = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
    case RECEIVE_ARTICLE:
      return merge({}, oldState, {[action.user.id]: action.user});
    case RECEIVE_ARTICLE_COMMENTS:
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
