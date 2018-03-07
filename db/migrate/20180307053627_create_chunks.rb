class CreateChunks < ActiveRecord::Migration[5.1]
  def change
    create_table :chunks do |t|
      t.integer :chunkable_id
      t.text :content
      t.integer :ord
      t.string :content_type

      t.timestamps
    end
    add_index :chunks, :chunkable_id
    add_index :chunks, :ord
  end
end
