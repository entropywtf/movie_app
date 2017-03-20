Rails.application.routes.draw do
  devise_for :users
  root to: 'site#index'
  namespace :api do
    namespace :v1 do
      resources :movies
      resources :ratings, only: [:create, :show, :update, :index]
      resources :categories, only: [:index]
    end
  end
end
