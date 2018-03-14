json.article do
  json.extract! @article, :id, :title, :author_id, :publish_date, :published, :lead_text
  json.chunks @article.chunks.order(:ord).pluck(:id)
  json.comments @article.comments.order(:created_at).pluck(:id)
  json.comment_authors @article.comments.pluck(:author_id)
  json.liked current_user.liked_articles.include?(article) if logged_in?
  json.like_count article.likes.count
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
  json.following current_user.subscriptions.include?(@article.author) if logged_in?
end
