json.id user.id
json.full_name user.full_name
json.bio user.bio
json.avatar_url asset_path(user.avatar.url)
json.following current_user.subscriptions.include?(user) if logged_in?
