class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      user_params[:email],
      user_params[:password]
    )

    if @user && @user.save
      login(@user)
      render '/api/users/show'
    else
      render json: ["Your login information was incorrect."], status: 403
    end
  end

  def destroy
    if logged_in?
      logout
      render json: {}
    else
      render json: ["Not logged in"], status: 401
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :full_name, :bio)
  end

end
