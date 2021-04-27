class Admin::SchedulesController < Comfy::Admin::BaseController

  before_action :build_schedule,  only: [:new, :create]
  before_action :load_schedule,   only: [:show, :edit, :update, :destroy]

  def index
    @schedules = Schedule.page(params[:page])
  end

  def show
    render
  end

  def new
    render
  end

  def edit
    render
  end

  def create
    @schedule.save!
    flash[:success] = 'Schedule created'
    redirect_to action: :show, id: @schedule
  rescue ActiveRecord::RecordInvalid
    flash.now[:danger] = 'Failed to create Schedule'
    render action: :new
  end

  def update
    @schedule.update!(schedule_params)
    flash[:success] = 'Schedule updated'
    redirect_to action: :show, id: @schedule
  rescue ActiveRecord::RecordInvalid
    flash.now[:danger] = 'Failed to update Schedule'
    render action: :edit
  end

  def destroy
    @schedule.destroy
    flash[:success] = 'Schedule deleted'
    redirect_to action: :index
  end

protected

  def build_schedule
    @schedule = Schedule.new(schedule_params)
  end

  def load_schedule
    @schedule = Schedule.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    flash[:danger] = 'Schedule not found'
    redirect_to action: :index
  end

  def schedule_params
    params.fetch(:schedule, {}).permit(:date, :description)
  end
end
