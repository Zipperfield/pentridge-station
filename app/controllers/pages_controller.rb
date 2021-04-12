class PagesController < ApplicationController

    def home
      @contact = Contact.new
      
      # @event = Event.new
  
      # @member = Member.new
  
    end

  
  
    def about
  
    end
  
    


    private

    def allowed_params
      params.require(:event).permit(:description, :date)
    end
  end