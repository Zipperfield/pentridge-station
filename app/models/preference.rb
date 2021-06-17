class Preference < ApplicationRecord
  belongs_to :first_choice, class_name: 'Partner', optional: true
  belongs_to :second_choice, class_name: 'Partner', optional: true
  belongs_to :third_choice, class_name: 'Partner', optional: true
  belongs_to :event
  enum preference_type: { vendor: 0, entertainer: 1 }
  validate :different_preferences

  def check_nil
    errors.add(:first_choice, 'must exist') if first_choice.nil?
    errors.add(:second_choice, 'must exist') if second_choice.nil?
    errors.add(:third_choice, 'must exist') if third_choice.nil?
  end

  def all_choices_filled_out
    !first_choice.nil? && !second_choice.nil? && !third_choice.nil?
  end

  def choices_are_the_same
    (first_choice_id == second_choice_id) ||
      (second_choice_id == third_choice_id) ||
      (first_choice_id == third_choice_id)
  end

  def different_preferences
    return unless requested

    check_nil
    return unless all_choices_filled_out && choices_are_the_same

    errors.add(:first_choice, 'must be different than second choice and third choice')
  end
end
