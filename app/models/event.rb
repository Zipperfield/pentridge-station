class Event < ApplicationRecord
  belongs_to :contact
  has_many :preferences, dependent: :destroy
  enum event_type: { wedding: 0, party: 1, music: 2, meeting: 3 }
  enum num_attendees: { '1-14' => 0, '15-29' => 1, '30-49' => 2, '50+' => 4 }
  accepts_nested_attributes_for :contact
  accepts_nested_attributes_for :preferences

  after_save :conditonally_remove_preferences

  def conditonally_remove_preferences
    preferences.destroy(preferences.vendor.first.id) unless vendor_partnership
    preferences.destroy(preferences.musician.first.id) unless musician_partnership
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

  def num_attendees=(val)
    write_attribute :num_attendees, val.to_i
  end
end
