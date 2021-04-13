Rails.application.routes.draw do

  namespace :admin do
    resources :messages
  end

  namespace :admin do
    resources :contacts
  end

  resources :events, only: %i[create]
  resources :partners, only: %i[create]
  resources :contacts, only: %i[create]
  resources :messages, only: %i[create]

  get '/home', to: 'pages#home'
  get '/about', to: 'pages#about'
  get '/partner', to: 'partners#new'
  get '/book', to: 'events#new'


  root 'pages#home'
  comfy_route :cms_admin, path: "/admin"
  # Ensure that this route is defined last

  # I dont think I want this >
  comfy_route :cms, path: "/"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
