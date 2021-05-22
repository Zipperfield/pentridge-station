class Event < ApplicationRecord
  belongs_to :contact
  has_many :preferences, dependent: :destroy
  enum event_type: { wedding: 0, party: 1, music: 2, meeting: 3 }
  accepts_nested_attributes_for :contact
  accepts_nested_attributes_for :preferences

  # after_save :conditonally_remove_preferences

  # def no_preferences_desired(attributed)
  #   puts attributed
  #   (!vendor_partnership && attributed['preference_type'] == 'vendor') ||
  #     (!musician_partnership && attributed['preference_type'] == 'musician')
  # end

  # def conditonally_remove_preferences
  #   preferences.destroy(preferences.vendor.first.id) unless vendor_partnership
  #   preferences.destroy(preferences.musician.first.id) unless musician_partnership
  # end
  validates :start_time, :end_time, :event_type, :num_attendees, presence: true
  validates_numericality_of :num_attendees
  validates :num_attendees, inclusion: 1..300
  validates_associated :preferences
  validate :end_later_than_start
  validate :date_cannot_be_in_the_past
  validate :do_not_overbook_date

  def date_cannot_be_in_the_past
    errors.add(:date, "can't be in the past") if
    !date.blank? && (date < Date.today)
  end

  def end_later_than_start
    # TODO: This could run without existing
    return unless !end_time.blank? && !start_time.blank? && end_time <= start_time

    errors.add(:start_time, 'must be earlier than \'end_time\'')
    errors.add(:end_time, 'must be later than \'start_time\'')
  end

  def do_not_overbook_date
    errors.add(:date, 'is unavailable') if
    !date.blank? && Schedule.exists?(date: date)
  end

  def hourly_choices(start, finish)
    # (1..5).map { |i| [i, i+1] }
    (start..finish).map do |i|
      hour = Tod::TimeOfDay.new(i)
      [hour.to_s(:short), hour]
    end
  end

  def event_type=(val)
    write_attribute :event_type, val.to_i
  end
end
