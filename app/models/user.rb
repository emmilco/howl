# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  full_name           :string           not null
#  session_token       :string           not null
#  password_digest     :string           not null
#  bio                 :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  email               :string           not null
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#

class User < ApplicationRecord
  validates :full_name, :password_digest, :session_token, :email, presence: true
  validates :email, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  before_validation :ensure_session_token

  has_attached_file :avatar, styles: { medium: ["300x300#", :jpeg]}, default_url: "howl_default_avatar.svg"
  validates_attachment :avatar,
    content_type: { content_type: ["image/jpeg", "image/gif", "image/png", "image/svg"] }

  has_many :articles,
  dependent: :destroy,
  foreign_key: :author_id,
  class_name: :Article

  has_many :comments,
  foreign_key: :author_id,
  class_name: :Comment,
  dependent: :destroy

  has_many :follows, #i.e. instances of self following other user
  foreign_key: :follower_id,
  class_name: :Follow,
  dependent: :destroy

  has_many :subscriptions, #i.e. users self follows
  through: :follows,
  source: :followee,
  dependent: :destroy

  has_many :followings, #i.e. instances of self being followed
  foreign_key: :followee_id,
  class_name: :Follow,
  dependent: :destroy

  has_many :subscribers, #i.e. users who follow self
  through: :followings,
  source: :follower

  has_many :likes,
  dependent: :destroy

  has_many :liked_articles,
  through: :likes,
  source: :likeable,
  source_type: :Article

  has_many :liked_comments,
  through: :likes,
  source: :likeable,
  source_type: :Comment

  attr_reader :password

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return user if user && user.is_password?(password)
    nil
  end

  def self.ten_most_followed
    Follow.group(:followee_id)
    .select('followee_id, COUNT(follower_id) as follower')
    .order('follower desc')
    .limit(10)
    .collect(&:followee_id)
  end

  def generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token
    self.session_token = generate_session_token
    self.save
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def seed_subscriptions
    User.ten_most_followed.each { |sub| self.subscriptions << User.find(sub) }
  end

  private

  def ensure_session_token
    self.session_token ||= generate_session_token
  end
end
