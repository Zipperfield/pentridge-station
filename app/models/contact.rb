class Contact < ApplicationRecord
  enum entry_process: %w[Newsletter Message Event]
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :first_name, :email, presence: true
  validates_length_of :first_name, maximum: 32
  validates_length_of :last_name, maximum: 20
  validates_length_of :email, :last_name, maximum: 42
end
