json.extract! @chunk, :id, :chunkable_id, :content, :ord, :content_type
json.image_url asset_path(@chunk.image.url)
