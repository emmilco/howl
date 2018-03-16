import * as CommentsAPIUtil from '../util/comments_api_util';

export const RECEIVE_ARTICLE_COMMENTS = "RECEIVE_ARTICLE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const RECEIVE_COMMENT_LIKE = "RECEIVE_COMMENT_LIKE";
export const REMOVE_COMMENT_LIKE = "REMOVE_COMMENT_LIKE";

export const receiveArticleComments = ({ comments, users }) => {
  return {
    type: RECEIVE_ARTICLE_COMMENTS,
    comments,
    users
  };
};

export const receiveComment = ({ comment, user }) => {
  return {
    type: RECEIVE_COMMENT,
    comment,
    user
  };
};

export const removeComment = (comment) => {
  return {
    type: REMOVE_COMMENT,
    comment
  };
};

export const receiveCommentLike = (id) => {
  return {
    type: RECEIVE_COMMENT_LIKE,
    id
  };
};

export const removeCommentLike = (id) => {
  return {
    type: REMOVE_COMMENT_LIKE,
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

export const deleteComment = (comment) => {
  return (dispatch) => {
    return CommentsAPIUtil.deleteComment(comment.id).then((payload) => {
      return dispatch(removeComment(comment));
    });
  };
};

export const likeComment = (commentId) => {
  return (dispatch) => {
    return CommentsAPIUtil.likeComment(commentId).then(() => {
      return dispatch(receiveCommentLike(commentId));
    });
  };
};

export const unlikeComment = (commentId) => {
  return (dispatch) => {
    return CommentsAPIUtil.unlikeComment(commentId).then(() => {
      return dispatch(removeCommentLike(commentId));
    });
  };
};
