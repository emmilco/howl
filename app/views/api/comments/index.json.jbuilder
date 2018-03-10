json.comments do
  @article.comments.map do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :author_id, :content, :article_id, :created_at, :updated_at
    end
  end
end

json.users do
  @article.comments.map do |comment|
    json.set! comment.author_id do
      json.partial! "api/users/user", user: comment.author
    end
  end
end
