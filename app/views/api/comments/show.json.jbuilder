json.comment do
  json.extract! @comment, :id, :author_id, :content, :article_id, :created_at, :updated_at
  json.liked current_user.liked_comments.include?(@comment) if logged_in?
  json.like_count @comment.likes.count
end

json.user do
  json.id current_user.id
  json.full_name current_user.full_name
  json.bio current_user.bio
  json.avatar_url asset_path(current_user.avatar.url)
end
