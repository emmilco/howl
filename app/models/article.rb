# == Schema Information
#
# Table name: articles
#
#  id              :integer          not null, primary key
#  title           :string           default("untitled")
#  author_id       :integer          not null
#  publish_date    :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  published       :boolean
#  header_image_id :integer
#

class Article < ApplicationRecord
  validates :author, presence: true

  belongs_to :author,
  foreign_key: :author_id,
  class_name: :User

  has_many :chunks,
  dependent: :destroy,
  foreign_key: :chunkable_id

  has_many :comments,
  dependent: :destroy

  has_many :article_images,
  dependent: :destroy


  # NOTE: at present I am not using header images. The featured image
  # for each article will be the first image in the database.
  
  belongs_to :header_image,
  foreign_key: :header_image_id,
  class_name: :ArticleImage

  accepts_nested_attributes_for :chunks,
  allow_destroy: true

end
