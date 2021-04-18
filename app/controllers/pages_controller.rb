class PagesController < ApplicationController
  before_action :set_newsletter_form, only: %i[home about]
  def home
    @message = Message.new
    @message.build_contact
  end

  def about; end

  private

  def set_newsletter_form
    @contact = Contact.new
  end
end
