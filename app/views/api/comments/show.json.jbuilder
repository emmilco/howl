json.extract! @comment, :id, :author_id, :content, :article_id, :created_at, :updated_at
json.liked current_user.liked_comments.include?(@comment) if logged_in?
json.like_count @comment.likes.count
