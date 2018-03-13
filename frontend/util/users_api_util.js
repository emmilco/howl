export const fetchUser = (userId) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}`
  });
};

export const followUser = (userId) => {
  return $.ajax({
    method: "POST",
    url: `/api/users/${userId}/follow`
  });
};

export const unfollowUser = (userId) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/users/${userId}/follow`
  });
};
