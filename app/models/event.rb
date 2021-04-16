class Event < ApplicationRecord
  belongs_to :contact
  enum event_type: %w[Wedding Party Music Meeting]
  accepts_nested_attributes_for :contact
end
