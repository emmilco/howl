export const createChunk = (chunk) => {
  return $.ajax({
    url: "/api/chunks/",
    method: "POST",
    data: { chunk }
  });
};
