class Contact < ApplicationRecord
  enum entry_process: %w[Newsletter Message Event]
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :first_name, :email, presence: true
end
