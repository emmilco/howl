class AddAttachmentImageToArticleImages < ActiveRecord::Migration[5.1]
  def self.up
    change_table :article_images do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :article_images, :image
  end
end
