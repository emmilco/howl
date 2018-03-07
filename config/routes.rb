Rails.application.routes.draw do
  namespace :api do
    get 'articles/show'
  end

  namespace :api do
    get 'articles/create'
  end

  namespace :api do
    get 'articles/update'
  end

  namespace :api do
    get 'articles/index'
  end

  namespace :api do
    get 'articles/destroy'
  end

  namespace :api do
    get 'articles/howl'
  end

  namespace :api do
    get 'articles/unhowl'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update, :destroy, :follow, :unfollow]
    resource :session, only: [:create, :destroy]
    resources :articles, only: [:show, :create, :update, :index, :destroy, :howl, :unhowl]
  end
end
