class Api::UsersController < ApplicationController

  before_action :ensure_logged_in, only: [:update, :destroy, :follow, :unfollow]

  def create
    @user = User.new(user_params)
    #TODO subscribe new user to most followed feeds
    if @user.save && @user.seed_subscriptions
      login(@user)
      render '/api/sessions/show'
    else
      debugger
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
    @user = User.find(params[:id])
    if @user == current_user
      @user.update(user_params)
      render :show
    else
      render json: ["Must be logged in"], status: 401
    end
  end

  def follow
    @user = current_user
    @followee = User.find(params[:id])
    @followee.subscribers << current_user if @followee
  end

  def unfollow
    @user = current_user
    @followee = User.find(params[:id])
    @followee.subscribers.delete(current_user) if @followee
  end

  private

  def user_params
    params.require(:user).permit(:email, :full_name, :bio, :password, :avatar)
  end
end
