class Partner < ActiveRecord::Base

  # -- Relationships -----------------------------------------------------------


  # -- Callbacks ---------------------------------------------------------------


  # -- Validations -------------------------------------------------------------
  validate :only_vendor_or_musician
  
  def only_vendor_or_musician
    if vendor == musician
      errors.add(:vendor, "cannot be equal to musician")
    end
  end


  # -- Scopes ------------------------------------------------------------------


  # -- Class Methods -----------------------------------------------------------


  # -- Instance Methods --------------------------------------------------------


end
