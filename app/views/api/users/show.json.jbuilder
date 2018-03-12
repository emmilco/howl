json.id @user.id
json.full_name @user.full_name
json.bio @user.bio
json.avatar_url asset_path(@user.avatar.url)

# TODO: Upon Articles implementation, add articles and article chunks.
