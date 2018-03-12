import * as ChunksAPIUtil from '../util/chunks_api_util';
import { receiveArticle } from './article_actions';

export const RECEIVE_CHUNK = "RECEIVE_CHUNK";
export const REMOVE_CHUNK = "REMOVE_CHUNK";

export const receiveChunk = (chunk) => {
  return {
    type: RECEIVE_CHUNK,
    chunk
  };
};

export const removeChunk = (chunk) => {
  return {
    type: REMOVE_CHUNK,
    chunk
  };
};

export const createChunk = (article, ord) => {
  return (dispatch) => {
    return ChunksAPIUtil.createChunk(article, ord)
      .then((payload) => { return dispatch(receiveArticle(payload));
    });
  };
};

export const deleteChunk = (chunk) => {
  return (dispatch) => {
    return ChunksAPIUtil.deleteChunk(chunk).then((payload) => {
      return dispatch(receiveArticle(payload));
    });
  };
};

export const updateChunk = (formData, chunkId) => {
  return (dispatch) => {
    return ChunksAPIUtil.updateChunk(formData, chunkId).then((payload) => {
      return dispatch(receiveChunk({[chunkId]: payload}));
    });
  };
};
