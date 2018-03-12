export const createChunk = (article, ord) => {
  return $.ajax({
    url: "/api/chunks/",
    method: "POST",
    data: { article, ord }
  });
};

export const deleteChunk = (chunk) => {
  return $.ajax({
    url: `/api/chunks/${chunk.id}`,
    method: "DELETE",
    data: { chunk }
  });
};

export const updateChunk = (formData, chunkId) => {
  return $.ajax({
    url: `/api/chunks/${chunkId}`,
    method: "PATCH",
    processData: false,
    contentType: false,
    dataType: 'json',
    data: formData
  });
};
