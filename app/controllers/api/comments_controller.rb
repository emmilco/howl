class Api::CommentsController < ApplicationController

  before_action :ensure_logged_in, only: [:create, :update, :destroy, :howl, :unhowl]
  def index
    @article = Article.find(params[:article_id])
    render :index
  end

  def show
    @comment = Comment.find(params[:id])
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.author = current_user
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages
    end
  end

  def update
    @comment = current_user.comments.find(params[:id])
    if @comment && @comment.update(comment_params)
      render :show
    else
      render json: @comment.errors.full_messages
    end
  end

  def destroy
    @comment = current_user.comments.find(params[:id])
    unless @comment && @comment.destroy
      render json: @comment.errors.full_messages
    end
  end

  def like
  end

  def unlike
  end

  private

  def comment_params
    params.require(:comment).permit(
      :id,
      :article_id,
      :content
    )
  end
end
