# == Schema Information
#
# Table name: articles
#
#  id           :integer          not null, primary key
#  title        :string           default("untitled")
#  author_id    :integer          not null
#  publish_date :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  published    :boolean
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

  accepts_nested_attributes_for :chunks,
  allow_destroy: true

  def header_image_url
    first_image = self.chunks
      .where.not(image_file_name: nil)
      .order(:ord).first
    return first_image.image.url if first_image
    nil
  end

  def comments_count
    self.comments.count
  end

  def lead_text
    self.chunks.where(content_type: "p").order(:ord).first.content
  end

end
