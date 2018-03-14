class FixColumnOnLikesTable < ActiveRecord::Migration[5.1]
  def change
    remove_column :likes, :likeable_type
    add_column :likes, :likeable_type, :string
    add_index :likes, :likeable_type
  end
end
