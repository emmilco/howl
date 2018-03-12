class AddHeaderImageToArticles < ActiveRecord::Migration[5.1]
  def change
    add_column :articles, :header_image_id, :integer
  end
end
