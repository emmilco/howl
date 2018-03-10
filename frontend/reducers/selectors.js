export const selectArticleChunks = (state, article) => {
  if (!article) { return []; }
  return article.chunks.map((chunkId) => {
    return state.ents.chunks[chunkId];
  });
};

export const selectArticleChunksforEdit = (state, article) => {
  if (!article) { return []; }
  const chunks = {};
  article.chunks.forEach((chunkId) => {
    chunks[chunkId] = state.ents.chunks[chunkId];
  });
  return chunks;
};

export const selectArticleComments = (state, articleId) => {
  const article = state.ents.articles[articleId];
  if (!article.comments) { return []; }
  const comments = [];
  article.comments.forEach((commentId) => {
    comments.push(state.ents.comments[commentId]);
  });
  return comments;
};

export const selectArticleCommentAuthors = (state, articleId) => {
  const article = state.ents.articles[articleId];
  if (!article.comments) { return []; }
  const commentAuthors = {};
  article.comment_authors.forEach((userId) => {
    commentAuthors[userId] = state.ents.users[userId];
  });
  return commentAuthors;
};
