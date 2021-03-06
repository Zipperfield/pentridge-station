class Admin::EventsController < Comfy::Admin::BaseController
  before_action :build_event,  only: %i[new create]
  before_action :load_event,   only: %i[show edit update destroy]

  def index
    @events = Event.page(params[:page])
    @schedule = Schedule.new
  end

  def show
    render
  end

  def new
    @event.build_contact
    @event.preferences.build(preference_type: 'vendor')
    @event.preferences.build(preference_type: 'entertainer')
    render
  end

  def edit
    render
  end

  def create
    @event.save!
    flash[:success] = 'Event created'
    redirect_to action: :show, id: @event
  rescue ActiveRecord::RecordInvalid
    flash.now[:danger] = 'Failed to create Event'
    render action: :new
  end

  def update
    @event.update!(event_params)
    flash[:success] = 'Event updated'
    redirect_to action: :show, id: @event
  rescue ActiveRecord::RecordInvalid
    flash.now[:danger] = 'Failed to update Event'
    render action: :edit
  end

  def destroy
    @event.destroy
    flash[:success] = 'Event deleted'
    redirect_to action: :index
  end

  protected

  def build_event
    @event = Event.new(event_params)
  end

  def load_event
    @event = Event.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    flash[:danger] = 'Event not found'
    redirect_to action: :index
  end

  def event_params
    params.fetch(:event, {}).permit(:date, :start_time, :end_time, :additional_time, :event_type,
                                    :doorperson, :alcohol, :open_bar,
                                    contact_attributes: %i[first_name last_name email entry_process phone_number])
  end
end
