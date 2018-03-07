# == Schema Information
#
# Table name: chunks
#
#  id           :integer          not null, primary key
#  chunkable_id :integer          not null
#  content      :text
#  ord          :integer          not null
#  content_type :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class ChunkTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
