export const selectArticleChunks = (state, article) => {
  if (!article) {
    return [];
  }

  return article.chunks.map((chunkId) => {
    return state.ents.chunks[chunkId];
  });
};
