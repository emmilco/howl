# == Schema Information
#
# Table name: chunks
#
#  id                 :integer          not null, primary key
#  chunkable_id       :integer          not null
#  content            :text
#  ord                :integer          not null
#  content_type       :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  youtube_url        :string
#

class Chunk < ApplicationRecord
  validates :article, :ord, :content_type, presence: true
  validates :content_type, inclusion:
    %W(p h1 h2 quote divider img mov)

  has_attached_file :image, styles: { medium: ["600x600#", :jpeg]}, default_url: "missing.png"
  validates_attachment :image,
    content_type: { content_type: ["image/jpeg", "image/gif", "image/png", "image/svg"] }

  belongs_to :article,
  foreign_key: :chunkable_id,
  class_name: :Article

  has_many :siblings,
  through: :article,
  source: :chunks


end
