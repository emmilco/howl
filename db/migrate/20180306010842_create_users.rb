class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :full_name, null: false
      t.string :session_token, null: false
      t.string :password_digest, null: false
      t.string :bio

      t.timestamps
    end
  end
end
