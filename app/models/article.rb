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

  has_many :likes,
  as: :likeable

  has_many :likers,
  through: :likes,
  source: :user

  accepts_nested_attributes_for :chunks,
  allow_destroy: true

  def self.logged_in_index_articles(user)
    Article.where(author_id: user.subscriptions.pluck(:id))
      .includes(:author)
      .where(published: true)
      .order(publish_date: :desc)
      .limit(30).select { |article| article.header_image_url }
  end

  def self.logged_out_index_articles
    Article.includes(:author)
      .where(published: true)
      .order(publish_date: :desc)
      .limit(30).select { |article| article.header_image_url }
  end

  def create_chunk_at(ord)
    self.chunks.order(:ord).each do |chunk|
      chunk.ord += 1 if chunk.ord >= ord
      chunk.save
    end
    Chunk.create(
      chunkable_id: self.id,
      content_type: "p",
      content: "",
      ord: ord
    )
    self.reload
    self.correct_chunk_sequence
  end

  def correct_chunk_sequence
    self.chunks.order(:ord).each.with_index do |chunk, idx|
      chunk.ord = idx
      chunk.save
    end
  end

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
    first_para = self.chunks.where(content_type: "p").order(:ord).first
    return first_para.content if first_para
    nil
  end


end
