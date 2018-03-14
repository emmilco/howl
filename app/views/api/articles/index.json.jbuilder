json.articles do
  @articles.map do |article|
    json.set! article.id do
      json.extract! article,
      :id,
      :author_id,
      :title,
      :publish_date,
      :header_image_url,
      :comments_count,
      :lead_text
      json.liked current_user.liked_articles.include?(article) if logged_in?
      json.like_count article.likes.count
    end
  end
end

json.users do
  @articles.map do |article|
    json.set! article.author_id do
      json.partial! "api/users/user", user: article.author
    end
  end
end

json.homepage_articles_index @articles.pluck(:id)
json.homepage_authors_index @articles.pluck(:author_id)
