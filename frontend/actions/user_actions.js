import * as UsersAPIUtil from '../util/users_api_util';

export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUser = ({ user, articles }) => {
  return {
    type: RECEIVE_USER,
    user,
    articles
  };
};

export const fetchUser = (userId) => {
  return (dispatch) => {
    return UsersAPIUtil.fetchUser(userId).then((payload) => {
      return dispatch(receiveUser(payload));
    });
  };
};
