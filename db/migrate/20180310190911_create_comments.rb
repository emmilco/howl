class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.integer :article_id, null: false
      t.integer :author_id, null: false
      t.text :content, null: false

      t.timestamps
    end
    add_index :comments, :article_id
    add_index :comments, :author_id
  end
end
