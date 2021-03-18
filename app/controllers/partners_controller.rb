class PartnersController < ApplicationController

    def new
      @partner = Partner.new
    end

    def create
      @partner = Partner.new(allowed_params)
      if @partner.save
        redirect_to :home, notice: 'Event was successfully created.'
      else 
        render root_path
      end

    end

    private

    def allowed_params
      params.require(:partner).permit(:message, :email)
    end
  end