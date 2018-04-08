class Api::ChunksController < ApplicationController
  before_action :ensure_logged_in

  def create
    @article = Article.includes(:chunks).find(article_params[:id])
    if @article.author == current_user
      @article.update(article_params)
      @article.create_chunk_at(ord_params[:insertAt].to_i)
      render '/api/articles/show'
    else
      render json: ["Content does not belong to current user."], status: 403
    end
  end

  def destroy
    chunk = Chunk.includes(:article).find(chunk_params[:id])
    @article = chunk.article
    if chunk && chunk.article.author == current_user
      chunk.destroy
      @article.correct_chunk_sequence
      @article.reload
      render '/api/articles/show'
    else
      render json: ["Content does not belong to current user."], status: 403
    end
  end

  def update
    @chunk = Chunk.find(params[:id])
    if @chunk && @chunk.article.author == current_user && @chunk.update(chunk_params)
      @chunk.update(content_type: "img")
      render :show
    else
      render @chunk.errors.full_messages
    end
  end

  private

  def chunk_params
    params.require(:chunk).permit(:id, :chunkable_id, :ord, :content_type, :content, :image)
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
      :published,
      chunks_attributes: [
        :content,
        :ord,
        :content_type,
        :id,
        :chunkable_id,
        :image,
        :youtube_url
      ]
    )
  end
end
