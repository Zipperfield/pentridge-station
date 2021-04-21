class Partner < ActiveRecord::Base
  # -- Relationships -----------------------------------------------------------
  has_many :first_choices, class_name: 'Preference', foreign_key: 'first_choice'
  has_many :second_choices, class_name: 'Preference', foreign_key: 'first_choice'
  has_many :third_choices, class_name: 'Preference', foreign_key: 'first_choice'

  enum category: { Vendor: 0, Musician: 1 }

  # -- Callbacks ---------------------------------------------------------------

  # -- Validations -------------------------------------------------------------

  # -- Scopes ------------------------------------------------------------------

  # -- Class Methods -----------------------------------------------------------

  # -- Instance Methods --------------------------------------------------------
end
