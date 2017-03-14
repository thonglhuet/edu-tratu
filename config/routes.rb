Rails.application.routes.draw do
  devise_for :users
  root "static_pages#home"
  resources :dictionaries
  resources :searchs, only: [:index, :show]
  resources :auth, only: :index
  resources :categories
  resources :organizations
end
