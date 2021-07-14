class ContactsController < ApplicationController
  invisible_captcha only: [:create], on_spam: :pretend_not_spam

  def pretend_not_spam
    redirect_to root_path, notice: 'We added your contact to our mailing list!'
  end

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
