class PartnersController < ApplicationController
  before_action :set_newsletter_form, only: %i[index musicians vendors]

  def index
    @cms = Comfy::Cms::Page.find_by_full_path('/home')
    @partners = Partner.all
  end

  def musicians
    @cms = Comfy::Cms::Page.find_by_full_path('/home')
    @partners = Partner.musician
  end

  def vendors
    @cms = Comfy::Cms::Page.find_by_full_path('/home')
    @partners = Partner.vendor
  end

  private

  def set_newsletter_form
    @contact = Contact.new
  end
end
