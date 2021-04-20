class Event < ApplicationRecord
  belongs_to :contact
  enum event_type: %w[Wedding Party Music Meeting]
  enum num_attendees: ['1-15', '16-30', '31-49', '50+']
  accepts_nested_attributes_for :contact
end
