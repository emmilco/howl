Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api do
    resources :users, only: [:create, :show, :update, :destroy, :follow, :unfollow]
    resource :session, only: [:create, :destroy]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
