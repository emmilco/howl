export const fetchArticleComments = (id) => {
  return $.ajax({
    url: `/api/articles/${id}/comments`,
    method: "GET"
  });
};

export const createComment = (comment) => {
  return $.ajax({
    url: `/api/comments`,
    method: "POST",
    data: { comment }
  });
};

export const updateComment = (comment) => {
  return $.ajax({
    url: `/api/comments/${comment.id}`,
    method: "PATCH",
    data: { comment }
  });
};

export const deleteComment = (id) => {
  return $.ajax({
    url: `/api/comments/${id}`,
    method: "DELETE"
  });
};
