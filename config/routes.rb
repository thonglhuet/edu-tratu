Rails.application.routes.draw do
  devise_for :users
  root "static_pages#home"
  post "/import", to: "word_imports#create"
  resources :dictionaries
  resources :searchs, only: [:index, :show]
  resources :auth, only: :index
  resources :categories
  resources :organizations
  resources :words
  namespace :admin do
    root "admins#index", as: :root
  end
end
