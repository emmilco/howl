import * as CommentsAPIUtil from '../util/comments_api_util';

export const RECEIVE_ARTICLE_COMMENTS = "RECEIVE_ARTICLE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

export const receiveArticleComments = (comments) => {
  return {
    type: RECEIVE_ARTICLE_COMMENTS,
    comments
  };
};

export const receiveComment = (comment) => {
  return {
    type: RECEIVE_COMMENT,
    comment
  };
};

export const removeComment = (id) => {
  return {
    type: REMOVE_COMMENT,
    id
  };
};

export const fetchArticleComments = (id) => {
  return (dispatch) => {
    return CommentsAPIUtil.fetchArticleComments(id).then((payload) => {
      return dispatch(receiveArticleComments(payload));
    });
  };
};

export const createComment = (comment) => {
  return (dispatch) => {
    return CommentsAPIUtil.createComment(comment).then((payload) => {
      return dispatch(receiveComment(payload));
    });
  };
};

export const updateComment = (comment) => {
  return (dispatch) => {
    return CommentsAPIUtil.updateComment(comment).then((payload) => {
      return dispatch(receiveComment(payload));
    });
  };
};

export const deleteComment = (id) => {
  return (dispatch) => {
    return CommentsAPIUtil.deleteComment(id).then((payload) => {
      return dispatch(removeComment(id));
    });
  };
};
