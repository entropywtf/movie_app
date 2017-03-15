Rails.application.routes.draw do
  devise_for :users
  root to: 'site#index'
  namespace :api do
    namespace :v1 do
      resources :movies
    end
  end
end
