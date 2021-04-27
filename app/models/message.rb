class Message < ActiveRecord::Base
  belongs_to :contact
  accepts_nested_attributes_for :contact

  # -- Relationships -----------------------------------------------------------

  # -- Callbacks ---------------------------------------------------------------

  # -- Validations -------------------------------------------------------------
  validates :body, presence: true
  validates_associated :contact

  # -- Scopes ------------------------------------------------------------------

  # -- Class Methods -----------------------------------------------------------

  # -- Instance Methods --------------------------------------------------------
end
