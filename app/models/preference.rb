class Preference < ApplicationRecord
  belongs_to :first_choice, class_name: 'Partner', optional: true
  belongs_to :second_choice, class_name: 'Partner', optional: true
  belongs_to :third_choice, class_name: 'Partner', optional: true
  belongs_to :event
  enum preference_type: { vendor: 0, musician: 1 }
  validate :different_preferences

  def different_preferences
    puts 'DIFFERENT PREFERENCES: ______'

    if requested
      puts 'requested'
      if (first_choice_id == second_choice_id) || (second_choice_id == third_choice_id) || (first_choice_id == third_choice_id)
        puts 'adding error'
        errors.add(:first_choice, 'must be different than second choice and third choice')
      end
    else
      puts 'not requested'
      nil
    end
  end
end
