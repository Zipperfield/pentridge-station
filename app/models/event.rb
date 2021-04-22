class Event < ApplicationRecord
  belongs_to :contact
  has_many :preferences, dependent: :destroy
  enum event_type: { wedding: 0, party: 1, music: 2, meeting: 3 }
  enum num_attendees: { '1-14' => 0, '15-29' => 1, '30-49' => 2, '50+' => 4 }
  accepts_nested_attributes_for :contact
  accepts_nested_attributes_for :preferences

  def event_type=(val)
    write_attribute :event_type, val.to_i
  end

  def num_attendees=(val)
    write_attribute :num_attendees, val.to_i
  end
end
