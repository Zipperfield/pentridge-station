class ContactsController < ApplicationController

    def create
      @contact = Contact.new(allowed_params)
      if @contact.save
        redirect_to root_path, notice: 'We added your contact to our mailing list!' 
      else
        @contact
        render 'pages/home'
      end

      
      # @event = Event.new
  
      # @member = Member.new
  
    end


    private

    def allowed_params
      params.require(:contact).permit(:name, :email, :entry_process)
    end
  end