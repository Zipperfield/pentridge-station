class EventsController < ApplicationController
  before_action :set_newsletter_form, only: [:new]

  # GET /events/new
  def new
    @event = Event.new
    @event.build_contact
    # @vendor_preference = @event.preference.build
    @event.preferences.build
    # @musician_preference = @event.preference.build
    @vendor_choices = Partner.Vendor.collect { |p| [p.name, p.id] }
    # @musician_choices = Partner.Musician.collect { |p| [p.name, p.id] }
  end

  # POST /events or /events.json
  def create
    @event = Event.new(event_params)
    if @event.save
      redirect_to '/book', notice: 'Event was successfully created.'
    else
      set_newsletter_form
      render 'events/new', status: :unprocessable_entity
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def event_params
    params.require(:event).permit(:date, :start_time, :end_time, :additional_time, :event_type,
                                  :num_attendees,
                                  contact_attributes: %i[name email entry_process phone_number],
                                  preferences_attributes: %i[preference_type first_choice_id second_choice_id third_choice_id])
  end

  def set_newsletter_form
    @contact = Contact.new
  end
end
