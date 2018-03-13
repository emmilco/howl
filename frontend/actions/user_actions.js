import * as UsersAPIUtil from '../util/users_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const REMOVE_FOLLOW = "REMOVE_FOLLOW";

export const receiveUser = ({ user, articles }) => {
  return {
    type: RECEIVE_USER,
    user,
    articles
  };
};

export const receiveFollow = (id) => {
  return {
    type: RECEIVE_FOLLOW,
    id
  };
};

export const removeFollow = (id) => {
  return {
    type: REMOVE_FOLLOW,
    id
  };
};

export const fetchUser = (userId) => {
  return (dispatch) => {
    return UsersAPIUtil.fetchUser(userId).then((payload) => {
      return dispatch(receiveUser(payload));
    });
  };
};

export const followUser = (userId) => {
  return (dispatch) => {
    return UsersAPIUtil.followUser(userId).then(() => {
      return dispatch(receiveFollow(userId));
    });
  };
};

export const unfollowUser = (userId) => {
  return (dispatch) => {
    return UsersAPIUtil.unfollowUser(userId).then(() => {
      return dispatch(removeFollow(userId));
    });
  };
};
