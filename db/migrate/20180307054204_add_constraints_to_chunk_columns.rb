class AddConstraintsToChunkColumns < ActiveRecord::Migration[5.1]
  def change
    change_column :chunks, :chunkable_id, :integer, null: false
    change_column :chunks, :ord, :integer, null: false
  end
end
