class Popup < ActiveRecord::Base

  # -- Relationships -----------------------------------------------------------
  has_one_attached :photo, dependent: :destroy


  # -- Callbacks ---------------------------------------------------------------
  before_save do
    self.cookie = "onetimepopup-#{('a'..'z').to_a.sample(8).join}"
  end

  # -- Validations -------------------------------------------------------------


  # -- Scopes ------------------------------------------------------------------


  # -- Class Methods -----------------------------------------------------------


  # -- Instance Methods --------------------------------------------------------


end
