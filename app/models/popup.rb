class Popup < ActiveRecord::Base

  # -- Relationships -----------------------------------------------------------
  has_one_attached :photo, dependent: :destroy


  # -- Callbacks ---------------------------------------------------------------


  # -- Validations -------------------------------------------------------------


  # -- Scopes ------------------------------------------------------------------


  # -- Class Methods -----------------------------------------------------------


  # -- Instance Methods --------------------------------------------------------


end