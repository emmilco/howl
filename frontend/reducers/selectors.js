export const selectArticleChunks = (state, article) => {
  if (!article) {
    return [];
  }

  return article.chunks.map((chunkId) => {
    return state.ents.chunks[chunkId];
  });
};

export const selectArticleChunksforEdit = (state, article) => {
  if (!article) {
    return [];
  }

  const chunks = {};
  article.chunks.forEach((chunkId) => {
    chunks[chunkId] = state.ents.chunks[chunkId];
  });
  return chunks;
};
