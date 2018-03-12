json.article do
  json.extract! @article, :id, :title, :author_id, :publish_date, :published
  json.chunks @article.chunks.order(:ord).pluck(:id)
  json.comments @article.comments.order(:created_at).pluck(:id)
  json.comment_authors @article.comments.pluck(:author_id)
end

json.chunks do
  @article.chunks.map do |chunk|
    json.set! chunk.id do
      json.extract! chunk, :id, :chunkable_id, :content, :ord, :content_type
      json.image_url asset_path(chunk.image.url)
    end
  end
end

json.user do
  json.extract! @article.author, :id, :full_name, :bio, :created_at
end
