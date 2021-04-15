class PartnersController < ApplicationController
    before_action :build_contact, only: [:index]

    def index
      @partners = Partner.all
    end

  
    private

    def build_contact
      @contact = Contact.new
    end
  end