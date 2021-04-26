class MessagesController < ApplicationController
  def create
    @message = Message.new(allowed_params)
    if @message.save
      redirect_to root_path, notice: 'Your message has been registered and we will respond shortly.'
    else
      @contact = Contact.new
      render 'pages/home'
    end
  end

  private

  def allowed_params
    params.require(:message).permit(:body,
                                    contact_attributes: %i[first_name last_name email entry_process phone_number])
  end
end
