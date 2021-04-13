class EventsController < ApplicationController
  before_action :build_contact, only: [:new]

    def new
      @event = Event.new
    end 

    def create
      @event = Event.new(allowed_params)
      if @event.save
        redirect_to :home, notice: 'Event was successfully created.'
      else 
        render root_path
      end

    end

    private

    def allowed_params
      params.require(:event).permit(:description, :date)
    end

    def build_contact
      @contact = Contact.new
    end
  end