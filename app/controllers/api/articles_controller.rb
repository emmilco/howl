class Api::ArticlesController < ApplicationController

  def show
    @article = Article.find(params[:id])
    render :show
  end

  def create
    @article = Article.new(author_id: current_user.id)
    @article.save
    render :show
  end

  def update
    @article = current_user.articles.find(params[:id])
    if @article && @article.save
      render :show
    else
      render @article.errors.full_messages
    end
  end

  def index
    @articles = current_user.followees.articles
      .order(publish_date: :desc)
      .limit(20)
    render :index
  end

  def destroy
    @article = current_user.articles.find(params[:id])
    @article.destroy if @article
  end

  def howl
  end

  def unhowl
  end

  private

  def article_params
    params.require(:article).permit(
      :title,
      :publish_date,
      chunks: [:content, :ord, :content_type]
    )
  end
end
