class CorrectMisnamedColumnNameInLikes < ActiveRecord::Migration[5.1]
  def change
    remove_column :likes, :likeable
    add_column :likes, :likeable_id, :integer
    add_index :likes, :likeable_id
  end
end
