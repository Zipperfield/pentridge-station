class PartnersController < ApplicationController
  before_action :set_newsletter_form, only: %i[index entertainers vendors]

  def index
    @cms = Comfy::Cms::Page.find_by_full_path('/partners')
    @partners = Partner.all
  end

  def entertainers
    @cms = Comfy::Cms::Page.find_by_full_path('/partners')
    @partners = Partner.entertainer
  end

  def vendors
    @cms = Comfy::Cms::Page.find_by_full_path('/partners')
    @partners = Partner.vendor
  end

  private

  def set_newsletter_form
    @contact = Contact.new
  end
end
