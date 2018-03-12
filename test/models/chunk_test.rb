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

require 'test_helper'

class ChunkTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
