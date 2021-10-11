class Admin::PopupsController < Comfy::Admin::BaseController

  before_action :build_popup,  only: [:new, :create]
  before_action :load_popup,   only: [:show, :edit, :update, :destroy]

  def index
    @popups = Popup.page(params[:page])
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
    @popup.save!
    flash[:success] = 'Popup created'
    redirect_to action: :show, id: @popup
  rescue ActiveRecord::RecordInvalid
    flash.now[:danger] = 'Failed to create Popup'
    render action: :new
  end

  def update
    @popup.update!(popup_params)
    flash[:success] = 'Popup updated'
    redirect_to action: :show, id: @popup
  rescue ActiveRecord::RecordInvalid
    flash.now[:danger] = 'Failed to update Popup'
    render action: :edit
  end

  def destroy
    @popup.destroy
    flash[:success] = 'Popup deleted'
    redirect_to action: :index
  end

protected

  def build_popup
    @popup = Popup.new(popup_params)
  end

  def load_popup
    @popup = Popup.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    flash[:danger] = 'Popup not found'
    redirect_to action: :index
  end

  def popup_params
    params.fetch(:popup, {}).permit(:title, :body, :status, :photo, :cookie)
  end
end
