class Message < ActiveRecord::Base
  belongs_to :contact
  accepts_nested_attributes_for :contact

  # -- Relationships -----------------------------------------------------------

  # -- Callbacks ---------------------------------------------------------------

  # -- Validations -------------------------------------------------------------
  validates :body, presence: true
  validates_associated :contact
  validates_length_of :body, maximum: 170
  # -- Scopes ------------------------------------------------------------------

  # -- Class Methods -----------------------------------------------------------
  def body=(val)
    write_attribute :body, val.gsub("\r\n", "\n")
  end
  # -- Instance Methods --------------------------------------------------------
end
