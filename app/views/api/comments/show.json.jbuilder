json.set! @comment.id do
  json.extract! @comment, :id, :author_id, :content, :article_id, :created_at, :updated_at
end
