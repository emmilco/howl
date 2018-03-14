import { merge } from 'lodash';

import {
  RECEIVE_ARTICLE,
  REMOVE_ARTICLE,
  RECEIVE_HOMEPAGE_ARTICLES,
  RECEIVE_TITLE,
  TOGGLE_ARTICLE_PUBLISHED,
  RECEIVE_ARTICLE_LIKE,
  REMOVE_ARTICLE_LIKE
} from '../actions/article_actions';

import {
  REMOVE_CHUNK,
  RECEIVE_CHUNK
} from '../actions/chunk_actions';

import {
  REMOVE_COMMENT,
  RECEIVE_COMMENT
} from '../actions/comment_actions';

import {
  RECEIVE_USER
} from '../actions/user_actions';

const articlesReducer = (oldState = {}, action) => {
  const newState =  merge({}, oldState);
  let article;
  switch (action.type) {

    case RECEIVE_ARTICLE:
      newState[action.article.id] = action.article;
      return newState;

    case REMOVE_CHUNK:
      article = newState[action.chunk.chunkable_id];
      article.chunks.splice(article.chunks.indexOf(action.chunk.id), 1);
      return newState;

    case REMOVE_ARTICLE:
      delete newState[action.id];
      return newState;

    case RECEIVE_TITLE:
      return merge({}, oldState, action.title);

    case REMOVE_COMMENT:
      article = newState[action.comment.article_id];
      article.comments.splice(article.comments.indexOf(action.comment.id), 1);
      return newState;

    case RECEIVE_COMMENT:
      article = newState[action.comment.article_id];
      article.comments.push(action.comment.id);
      article.comment_authors.push(action.comment.author_id);
      return newState;

    case TOGGLE_ARTICLE_PUBLISHED:
      if (oldState[action.id].published) {
        newState[action.id].published = false;
      } else {
        newState[action.id].published = true;
        newState[action.id].publish_date = new Date();
      }
      return newState;

    case RECEIVE_USER:
    case RECEIVE_HOMEPAGE_ARTICLES:
      return merge({}, oldState, action.articles);

    case RECEIVE_ARTICLE_LIKE:
      newState[action.id].liked = true;
      newState[action.id].like_count += 1;
      return newState;
    case REMOVE_ARTICLE_LIKE:
      newState[action.id].liked = false;
      newState[action.id].like_count -= 1;
      return newState;

    default:
      return oldState;

  }
};

export default articlesReducer;
