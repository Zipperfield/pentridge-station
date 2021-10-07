Rails.application.routes.draw do
  namespace :admin do
    resources :popups
  end

  namespace :admin do
    resources :schedules
    resources :events
    resources :partners
    resources :messages
    resources :contacts
  end

  resources :events, only: %i[create]
  resources :contacts, only: %i[create]
  resources :messages, only: %i[create]

  get '/community', to: 'partners#index', as: :community
  get '/community/entertainers', to: 'partners#entertainers', as: :entertainers
  get '/community/vendors', to: 'partners#vendors', as: :vendors

  get '/calendar', to: 'pages#calendar'
  get '/home', to: 'pages#home'
  get '/about', to: 'pages#about'
  get '/book', to: 'events#new', as: :book

  root 'pages#home'
  comfy_route :cms_admin, path: '/admin'
  # Ensure that this route is defined last

  get '*path', to: 'pages#home'
  comfy_route :cms, path: '/'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
