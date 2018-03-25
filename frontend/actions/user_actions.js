import * as UsersAPIUtil from '../util/users_api_util';
import { receiveCurrentUser, receiveErrors } from './session_actions';


export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const REMOVE_FOLLOW = "REMOVE_FOLLOW";
export const RECEIVE_FOLLOWERS = "RECEIVE_FOLLOWERS";
export const RECEIVE_FOLLOWEES = "RECEIVE_FOLLOWEES";

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

export const receiveFollowers = (payload) => {
  return {
    type: RECEIVE_FOLLOWERS,
    follows: payload.follows,
    users: payload.users,
    id: payload.id
  };
};

export const receiveFollowees = (payload) => {
  return {
    type: RECEIVE_FOLLOWEES,
    follows: payload.follows,
    users: payload.users,
    id: payload.id
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

export const updateUser = (user) => {
  return (dispatch) => {
    return UsersAPIUtil.updateUser(user).then((payload) => {
      dispatch(receiveUser(payload));
      dispatch(receiveCurrentUser(payload.user));
    }, (errors) => dispatch(receiveErrors(errors.responseJSON)));
  };
};

export const updateAvatar = (formData, userId) => {
  return (dispatch) => {
    return UsersAPIUtil.updateAvatar(formData, userId).then((payload) => {
      dispatch(receiveUser(payload));
      dispatch(receiveCurrentUser(payload.user));
    });
  };
};

export const fetchFollowers = (id) => {
  return (dispatch) => {
    return UsersAPIUtil.fetchFollowers(id).then((payload) => {
      return dispatch(receiveFollowers(payload));
    });
  };
};

export const fetchFollowees = (id) => {
  return (dispatch) => {
    return UsersAPIUtil.fetchFollowees(id).then((payload) => {
      return dispatch(receiveFollowees(payload));
    });
  };
};
