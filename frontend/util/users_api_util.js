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

export const updateUser = (user) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${user.id}`,
    data: { user }
  });
};

export const updateAvatar = (formData, userId) => {
  return $.ajax({
    url: `/api/users/${userId}`,
    method: "PATCH",
    processData: false,
    contentType: false,
    dataType: 'json',
    data: formData
  });
};
