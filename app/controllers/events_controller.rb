class EventsController < ApplicationController
  before_action :set_newsletter_form, only: [:new]

  # GET /events/new
  def new
    @event = Event.new
    @event.build_contact
    @event.preferences.build(preference_type: 'vendor')
    @event.preferences.build(preference_type: 'entertainer')
    @excluded_dates = Schedule.pluck(:date).map { |d| d.strftime('%F') }.join(',')
    # @event.preferences.build
    get_event_types
    set_choices
    @cms = Comfy::Cms::Page.find_by_full_path('/book')
  end

  # POST /events or /events.json
  def create
    @event = Event.new(event_params)
    if @event.save
      EventMailer.with(event: @event).event_request_email.deliver_later

      redirect_to '/book', notice: 'We received your request and will respond as soon as possible.'
    else
      @cms = Comfy::Cms::Page.find_by_full_path('/book')
      set_choices
      set_newsletter_form
      flash[:alert] = 'Form invalid'
      render 'events/new', status: :unprocessable_entity
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def event_params
    params.require(:event).permit(:date, :start_time, :end_time, :additional_time, :event_type,
                                  :num_attendees, :doorperson, :alcohol, :open_bar,
                                  contact_attributes: %i[first_name last_name email entry_process phone_number],
                                  preferences_attributes: %i[requested preference_type first_choice_id second_choice_id third_choice_id])
  end

  def get_event_types
    @event_types = Event.event_types.keys[0...-1].map { |t| "\'#{t.split('/')[0].tr(' ', '_')}.\'" }.join(',')
  end

  def set_newsletter_form
    @contact = Contact.new
  end

  def set_choices
    @vendor_choices = Partner.vendor.collect { |p| [p.name, p.id] }
    @entertainer_choices = Partner.entertainer.collect { |p| [p.name, p.id] }
  end
end
