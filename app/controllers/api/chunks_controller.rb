class Api::ChunksController < ApplicationController
  before_action :ensure_logged_in

  def create
    @article = Article.find(article_params[:id])
    if @article.author_id = current_user.id
      @article.update(article_params)
      ord = ord_params[:insertAt].to_i
      @article.chunks.order(:ord).each do |chunk|
        chunk.ord += 1 if chunk.ord > ord
        chunk.save
      end
      Chunk.create(
        chunkable_id: @article.id,
        content_type: "p",
        content: "",
        ord: ord
      )

      render '/api/articles/show'
    else
      render json: ["Content does not belong to current user."], status: 403
    end
  end

  private

  def chunk_params
    params.require(:chunk).permit(:chunkable_id, :ord, :content_type, :content)
  end

  def ord_params
    params.require(:ord).permit(:insertAt)
  end

  def article_params
    params.require(:article).permit(
      :id,
      :title,
      :publish_date,
      :author_id,
      chunks_attributes: [:content, :ord, :content_type, :id, :chunkable_id]
    )
  end
end
