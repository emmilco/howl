export const selectArticleChunks = (state, article) => {
  if (!article || !article.chunks) { return []; }
  return article.chunks.map((chunkId) => {
    return state.ents.chunks[chunkId];
  });
};

export const selectArticleChunksforEdit = (state, article) => {
  if (!article || !article.chunks) { return []; }
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

export const selectUserArticles = (state, userId) => {
  const user = state.ents.users[userId];
  if (!user || !user.articles) { return []; }
  const articles = [];
  user.articles.forEach((articleId) => {
    articles.push(state.ents.articles[articleId]);
  });
  return articles;
};

export const selectHomepageArticles = (state) => {
  if (!state.session.homepage_articles_index) { return []; }
  const index = state.session.homepage_articles_index;
  const articles = index.map((id) => {
    return state.ents.articles[id];
  });
  return articles;
};

export const selectHomepageAuthors = (state) => {
  if (!state.session.homepage_authors_index) { return {}; }
  const homepageAuthors = {};
  state.session.homepage_authors_index.forEach((userId) => {
    homepageAuthors[userId] = state.ents.users[userId];
  });
  return homepageAuthors;
};

export const selectArticlesForManager = (state) => {
  if (!state.session.manager_articles_index) { return []; }
  const index = state.session.manager_articles_index;
  const articles = index.map((id) => {
    return state.ents.articles[id];
  });
  return articles;
};

export const selectFollowers = (state, id) => {
  const user = state.ents.users[id];
  if (!user.followers_index) { return []; }
  return user.followers_index.map((userId) => {
    return state.ents.users[userId];
  });
};

export const selectFollowees = (state, id) => {
  const user = state.ents.users[id];
  if (!user.followees_index) { return []; }
  return user.followees_index.map((userId) => {
    return state.ents.users[userId];
  });
};
