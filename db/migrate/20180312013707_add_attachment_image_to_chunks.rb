class AddAttachmentImageToChunks < ActiveRecord::Migration[5.1]
  def self.up
    change_table :chunks do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :chunks, :image
  end
end
