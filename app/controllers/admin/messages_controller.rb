class Admin::MessagesController < Comfy::Admin::BaseController
  before_action :build_message,  only: %i[new create]
  before_action :load_message,   only: %i[show edit update destroy]

  def index
    @messages = Message.page(params[:page]).includes(:contact)
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
    @message.save!
    flash[:success] = 'Message created'
    redirect_to action: :show, id: @message
  rescue ActiveRecord::RecordInvalid
    flash.now[:danger] = 'Failed to create Message'
    render action: :new
  end

  def update
    @message.update!(message_params)
    flash[:success] = 'Message updated'
    redirect_to action: :show, id: @message
  rescue ActiveRecord::RecordInvalid
    flash.now[:danger] = 'Failed to update Message'
    render action: :edit
  end

  def destroy
    @message.destroy
    flash[:success] = 'Message deleted'
    redirect_to action: :index
  end

  protected

  def build_message
    @message = Message.new(message_params)
  end

  def load_message
    @message = Message.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    flash[:danger] = 'Message not found'
    redirect_to action: :index
  end

  def message_params
    params.fetch(:message, {}).permit(:body, contact_attributes: %i[name email entry_process phone_number])
  end
end
