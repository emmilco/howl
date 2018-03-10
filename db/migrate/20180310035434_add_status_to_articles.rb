class AddStatusToArticles < ActiveRecord::Migration[5.1]
  def change
    add_column :articles, :published, :boolean
  end
end
