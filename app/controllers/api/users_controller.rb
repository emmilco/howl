class Api::UsersController < ApplicationController

  before_action :ensure_logged_in, only: [:update, :destroy, :follow]

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    if @user
      @articles = @user.articles.where(published: true).order(publish_date: :desc)
      render :show
    end
  end

  def update
    @user = User.find_by(params[:id])
    if @user == current_user
      @user.update(user_params)
    else
      render json: ["Must be logged in"], status: 401
    end
  end

  def follow
  end

  def unfollow
  end

  private

  def user_params
    params.require(:user).permit(:email, :full_name, :bio, :password, :avatar)
  end
end
