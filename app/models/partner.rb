class Partner < ActiveRecord::Base
  # -- Relationships -----------------------------------------------------------
  has_many :first_choices, class_name: 'Preference', foreign_key: 'first_choice', dependent: :destroy
  has_many :second_choices, class_name: 'Preference', foreign_key: 'first_choice', dependent: :destroy
  has_many :third_choices, class_name: 'Preference', foreign_key: 'first_choice', dependent: :destroy
  has_one_attached :photo, dependent: :destroy
  enum category: { vendor: 0, entertainer: 1 }

  # -- Callbacks ---------------------------------------------------------------

  # -- Validations -------------------------------------------------------------

  # -- Scopes ------------------------------------------------------------------

  # -- Class Methods -----------------------------------------------------------
  def category=(val)
    write_attribute :category, val.to_i
  end
  # -- Instance Methods --------------------------------------------------------
end
