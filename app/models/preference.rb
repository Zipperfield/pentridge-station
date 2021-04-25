class Preference < ApplicationRecord
  belongs_to :first_choice, class_name: 'Partner'
  belongs_to :second_choice, class_name: 'Partner'
  belongs_to :third_choice, class_name: 'Partner'
  belongs_to :event
  enum preference_type: { vendor: 0, musician: 1 }

  validate :different_preferences

  def different_preferences
    unless (first_choice_id == second_choice_id) || (second_choice_id == third_choice_id) || (first_choice_id == third_choice_id)
      return
    end

    errors.add(:first_choice, 'must be different than second choice and third choice')
  end
end
