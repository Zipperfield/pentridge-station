class MessagesController < ApplicationController

    def create
      @message = Message.new(allowed_params)
      if @message.save
        redirect_to root_path, notice: 'Your message has been registered and we will respond shortly.' 
      else
        @contact = Contact.new
        @message
        render 'pages/home'
      end
    end


    private

    def allowed_params
      params.require(:message).permit(:body, contact_attributes: [:name, :email, :entry_process])
    end
  end