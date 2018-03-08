export const RECEIVE_CHUNK = "RECEIVE_CHUNK";
export const REMOVE_CHUNK = "REMOVE_CHUNK";

export const receiveChunk = (chunk) => {
  return {
    type: RECEIVE_CHUNK,
    chunk
  };
};

export const removeChunk = (chunk) => {
  return {
    type: REMOVE_CHUNK,
    chunk
  };
};
