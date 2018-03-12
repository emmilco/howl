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
#

class Chunk < ApplicationRecord
  validates :article, :ord, :content_type, presence: true
  validates :content_type, inclusion:
    %W(p h1 h2 quote divider image)

  belongs_to :article,
  foreign_key: :chunkable_id,
  class_name: :Article

  has_many :siblings,
  through: :article,
  source: :chunks


end
