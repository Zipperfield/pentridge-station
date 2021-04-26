class ContactsController < ApplicationController
  def create
    @contact = Contact.new(allowed_params)
    if @contact.save
      redirect_to root_path, notice: 'We added your contact to our mailing list!'
    else
      @message = Message.new
      @message.build_contact
      render 'pages/home'
    end
  end

  private

  def allowed_params
    params.require(:contact).permit(:first_name, :last_name, :email, :entry_process, :phone_number)
  end
end
