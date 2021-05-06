Rails.application.routes.draw do
  namespace :admin do
    resources :schedules
  end

  namespace :admin do
    resources :events
    resources :partners
    resources :messages
    resources :contacts
  end

  resources :events, only: %i[create]
  resources :partners, only: %i[index]
  resources :contacts, only: %i[create]
  resources :messages, only: %i[create]

  get '/partners/musicians', to: 'partners#musicians', as: :musicians
  get '/partners/vendors', to: 'partners#vendors', as: :vendors

  get '/home', to: 'pages#home'
  get '/about', to: 'pages#about'
  get '/book', to: 'events#new', as: :book

  root 'pages#home'
  comfy_route :cms_admin, path: '/admin'
  # Ensure that this route is defined last

  # I dont think I want this >
  comfy_route :cms, path: '/'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
