class PagesController < ApplicationController
    before_action :build_contact, only: [:home, :about]
    def home
      # @contact = Contact.new    
      @message = Message.new
      @message.build_contact
    
    end

  
  
    def about
  
    end
  
    


    private

    def build_contact
      @contact = Contact.new
    end
  end