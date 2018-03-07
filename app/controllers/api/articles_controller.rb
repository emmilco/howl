class Api::ArticlesController < ApplicationController

  def show
    @article = Article.find(params[:id])
    render :show
  end

  def create
  end

  def update
  end

  def index
  end

  def destroy
  end

  def howl
  end

  def unhowl
  end

  private

  def article_params

  end
end
