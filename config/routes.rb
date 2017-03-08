Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#home"
  resource :alive, only: :show
  resources :dictionaries
  resources :searchs, only: :index
end
