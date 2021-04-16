class EventsController < ApplicationController
  before_action :build_contact, only: [:new]

  # GET /events/new
  def new
    @event = Event.new
    @event.build_contact
  end

  # POST /events or /events.json
  def create
    @event = Event.new(event_params)
    respond_to do |format|
      if @event.save
        format.html { redirect_to @event, notice: 'Event was successfully created.' }
        format.json { render :show, status: :created, location: @event }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def event_params
    params.require(:event).permit(:date, :start, :additional_time, :event_type, :contact_id)
  end

  def build_contact
    @contact = Contact.new
  end
end
