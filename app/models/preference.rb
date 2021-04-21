class Preference < ApplicationRecord
  belongs_to :first_choice, class_name: 'Partner'
  belongs_to :second_choice, class_name: 'Partner'
  belongs_to :third_choice, class_name: 'Partner'
  belongs_to :event
  enum preference_type: { Vendor: 0, Musician: 1 }
end
