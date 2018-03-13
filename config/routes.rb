Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update, :destroy]
    resource :session, only: [:create, :destroy]
    resources :articles, only: [:show, :create, :update, :index, :destroy, :howl, :unhowl] do
      resources :comments, only: [:index]
    end
    resources :chunks, only: [:create, :show, :destroy, :update]
    resources :comments, only: [:show, :create, :destroy, :update, :howl, :unhowl]
  end
  post 'api/users/:id/follow', to: 'api/users#follow', defaults: {format: :json}
  delete 'api/users/:id/follow', to: 'api/users#unfollow', defaults: {format: :json}
end
