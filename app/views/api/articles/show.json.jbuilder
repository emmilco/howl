json.article do
  json.extract! @article, :id, :title, :author_id, :publish_date
  json.chunks @article.chunks.order(:ord).pluck(:id)
end

json.chunks do
  @article.chunks.map do |chunk|
    json.set! chunk.id do
      json.extract! chunk, :id, :chunkable_id, :content, :ord, :content_type
    end
  end
end

json.user do
  json.extract! @article.author, :id, :full_name, :bio, :created_at
end
