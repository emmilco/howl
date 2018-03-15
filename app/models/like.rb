# == Schema Information
#
# Table name: likes
#
#  id            :integer          not null, primary key
#  user_id       :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  likeable_id   :integer
#  likeable_type :string
#

class Like < ApplicationRecord
  validates :user, :likeable, :likeable_type, presence: true

  belongs_to :user
  belongs_to :likeable, polymorphic: true

end
