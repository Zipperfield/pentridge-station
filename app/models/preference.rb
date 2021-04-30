class Preference < ApplicationRecord
  belongs_to :first_choice, class_name: 'Partner', optional: true
  belongs_to :second_choice, class_name: 'Partner', optional: true
  belongs_to :third_choice, class_name: 'Partner', optional: true
  belongs_to :event
  enum preference_type: { vendor: 0, musician: 1 }
  validate :different_preferences

  def different_preferences
    if requested
      puts 'requested'
      errors.add(:first_choice, 'must exist') if first_choice.nil?
      errors.add(:second_choice, 'must exist') if second_choice.nil?
      errors.add(:third_choice, 'must exist') if third_choice.nil?
      if (!first_choice.nil? && !second_choice.nil? && !third_choice.nil?) &&
         (first_choice_id == second_choice_id) || (second_choice_id == third_choice_id) || (first_choice_id == third_choice_id)
        errors.add(:first_choice, 'must be different than second choice and third choice')
      end
    end
  end
end
