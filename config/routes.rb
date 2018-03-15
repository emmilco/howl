Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  post 'api/users/:id/follow', to: 'api/users#follow', defaults: {format: :json}
  delete 'api/users/:id/follow', to: 'api/users#unfollow', defaults: {format: :json}
  get 'api/users/:id/subscribers', to: 'api/users#subscribers', defaults: {format: :json}
  get 'api/users/:id/subscriptions', to: 'api/users#subscriptions', defaults: {format: :json}

  post 'api/articles/:id/like', to: 'api/articles#like', defaults: {format: :json}
  delete 'api/articles/:id/like', to: 'api/articles#unlike', defaults: {format: :json}
  get 'api/articles/manage', to: 'api/articles#manage', defaults: {format: :json}

  post 'api/comments/:id/like', to: 'api/comments#like', defaults: {format: :json}
  delete 'api/comments/:id/like', to: 'api/comments#unlike', defaults: {format: :json}

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update, :destroy]
    resource :session, only: [:create, :destroy]
    resources :articles, only: [:show, :create, :update, :index, :destroy, :howl, :unhowl] do
      resources :comments, only: [:index]
    end
    resources :chunks, only: [:create, :show, :destroy, :update]
    resources :comments, only: [:show, :create, :destroy, :update, :howl, :unhowl]
  end


end
