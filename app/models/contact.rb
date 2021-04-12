class Contact < ApplicationRecord
    enum entry_process: ['Newsletter', 'Message', 'Event']
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP } 
end
