class Api::ChunksController < ApplicationController
  before_action :ensure_logged_in
  
  def create
    @chunk = Chunk.new(chunk_params)
    if Article.find(@chunk.chunkable_id).author_id = current_user.id
      @chunk.save
      render :show
    else
      render json: ["Content does not belong to current user."], status: 403
    end
  end

  private

  def chunk_params
    params.require(:chunk).permit(:chunkable_id, :ord, :content_type, :content)
  end
end
