class MessagesController < ApplicationController
  invisible_captcha only: [:create], on_spam: :pretend_not_spam

  def pretend_not_spam
    redirect_to root_path, notice: 'Your message has been registered and we will respond shortly.'
  end

  def create
    @message = Message.new(allowed_params)
    if @message.save
      EventMailer.with(message: @message).new_message_email.deliver_later

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
