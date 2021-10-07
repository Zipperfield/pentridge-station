class PagesController < ApplicationController
  before_action :set_newsletter_form, only: %i[home about calendar]
  def home
    @message = Message.new
    @popup = Popup.first
    @message.build_contact
    @cms = Comfy::Cms::Page.find_by_full_path('/home')
  end

  def about
    @cms = Comfy::Cms::Page.find_by_full_path('/about')
  end

  def calendar; end

  private

  def set_newsletter_form
    @contact = Contact.new
  end
end
