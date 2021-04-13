class PartnersController < ApplicationController
    before_action :build_contact, only: [:new]

    def new
      @partner = Partner.new
    end

    def create
      @partner = Partner.new(allowed_params)
      if @partner.save
        redirect_to :home, notice: 'Event was successfully created.'
      else 
        build_contact
        render root_path
      end

    end

    private

    def allowed_params
      params.require(:partner).permit(:message, :email)
    end

    def build_contact
      @contact = Contact.new
    end
  end