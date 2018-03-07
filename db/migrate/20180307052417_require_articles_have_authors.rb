class RequireArticlesHaveAuthors < ActiveRecord::Migration[5.1]
  def change
    change_column :articles, :author_id, :integer, null: false
  end
end
