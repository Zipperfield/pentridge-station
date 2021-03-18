class EventsController < ApplicationController

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
  end