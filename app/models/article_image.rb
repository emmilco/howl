# == Schema Information
#
# Table name: article_images
#
#  id                 :integer          not null, primary key
#  article_id         :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class ArticleImage < ApplicationRecord
  has_attached_file :image, default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates :article, presence: true

  belongs_to :article

end
