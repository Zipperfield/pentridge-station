class PartnersController < ApplicationController
    before_action :set_newsletter_form, only: [:index, :musicians, :vendors]

    def index
      @partners = Partner.all
    end

    def musicians
      @partners = Partner.musician
    end

    def vendors
      @partners = Partner.vendor
    end

  
    private

    def set_newsletter_form
      @contact = Contact.new
    end
  end