class CreateArticles < ActiveRecord::Migration[5.1]
  def change
    create_table :articles do |t|
      t.string :title, default: "untitled"
      t.integer :author_id
      t.datetime :publish_date

      t.timestamps
    end
    add_index :articles, :author_id
    add_index :articles, :publish_date
  end
end
