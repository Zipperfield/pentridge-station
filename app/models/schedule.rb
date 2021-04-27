class Schedule < ActiveRecord::Base
  # -- Relationships -----------------------------------------------------------

  # -- Callbacks ---------------------------------------------------------------

  # -- Validations -------------------------------------------------------------
  validate :date_cannot_be_in_the_past
  validates_uniqueness_of :date

  def date_cannot_be_in_the_past
    errors.add(:date, "can't be in the past") if
      !date.blank? && (date < Date.today)
  end

  # -- Scopes ------------------------------------------------------------------

  # -- Class Methods -----------------------------------------------------------

  # -- Instance Methods --------------------------------------------------------
end
