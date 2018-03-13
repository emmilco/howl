class CreateLikes < ActiveRecord::Migration[5.1]
  def change
    create_table :likes do |t|
      t.integer :user_id
      t.integer :likeable
      t.integer :likeable_type

      t.timestamps
    end
    add_index :likes, :user_id
    add_index :likes, :likeable
    add_index :likes, :likeable_type
  end
end
