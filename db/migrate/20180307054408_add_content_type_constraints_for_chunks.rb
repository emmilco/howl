class AddContentTypeConstraintsForChunks < ActiveRecord::Migration[5.1]
  def change
    change_column :chunks, :content_type, :string, null: false
  end
end
