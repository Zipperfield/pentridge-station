class PagesController < ApplicationController

    def home
      @contact = Contact.new    
      @message = Message.new
      @message.build_contact
    
    end

  
  
    def about
  
    end
  
    


    private

    def allowed_params
      params.require(:event).permit(:description, :date)
    end
  end