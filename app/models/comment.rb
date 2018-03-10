# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  article_id :integer          not null
#  author_id  :integer          not null
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ApplicationRecord
  validates :article, :author, :content, presence: true
  validates :content, length: {maximum: 3000}

  belongs_to :article

  belongs_to :author,
  foreign_key: :author_id,
  class_name: :User
  
end
