export const RECEIVE_CHUNKS = "RECEIVE_CHUNKS";
export const REMOVE_CHUNK = "REMOVE_CHUNK";

export const receiveChunks = (chunks) => {
  return {
    type: RECEIVE_CHUNKS,
    chunks
  };
};

export const removeChunk = (id) => {
  return {
    type: REMOVE_CHUNK,
    id
  };
};
