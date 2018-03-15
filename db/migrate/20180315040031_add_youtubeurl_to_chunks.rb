class AddYoutubeurlToChunks < ActiveRecord::Migration[5.1]
  def change
    add_column :chunks, :youtube_url, :string
  end
end
