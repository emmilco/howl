export const createChunk = (article, ord) => {
  return $.ajax({
    url: "/api/chunks/",
    method: "POST",
    data: { article, ord }
  });
};
