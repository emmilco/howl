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

require 'test_helper'

class ArticleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
