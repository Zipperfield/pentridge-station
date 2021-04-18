class PartnersController < ApplicationController
    before_action :set_newsletter_form, only: [:index]

    def index
      @partners = Partner.all
    end

  
    private

    def set_newsletter_form
      @contact = Contact.new
    end
  end