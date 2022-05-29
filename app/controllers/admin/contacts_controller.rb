class Admin::ContactsController < Comfy::Admin::BaseController
  before_action :build_contact,  only: %i[new create]
  before_action :load_contact,   only: %i[show edit update destroy]

  def index
    @contacts = Contact.page(params[:page])
    respond_to do |format|
      format.html
      format.csv do
        @contacts = Contact.all
        send_data to_csv(@contacts), filename: "Contacts-#{DateTime.current}.csv"
      end
    end
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
    @contact.save!
    flash[:success] = 'Contact created'
    redirect_to action: :show, id: @contact
  rescue ActiveRecord::RecordInvalid
    flash.now[:danger] = 'Failed to create Contact'
    render action: :new
  end

  def update
    @contact.update!(contact_params)
    flash[:success] = 'Contact updated'
    redirect_to action: :show, id: @contact
  rescue ActiveRecord::RecordInvalid
    flash.now[:danger] = 'Failed to update Contact'
    render action: :edit
  end

  def destroy
    @contact.destroy
    flash[:success] = 'Contact deleted'
    redirect_to action: :index
  end

  protected

  def build_contact
    @contact = Contact.new(contact_params)
  end

  def load_contact
    @contact = Contact.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    flash[:danger] = 'Contact not found'
    redirect_to action: :index
  end

  def contact_params
    params.fetch(:contact, {}).permit(:first_name, :last_name, :email, :entry_process, :phone_number)
  end

  def to_csv(contacts)
    attributes = Contact.column_names

    CSV.generate(headers: true) do |csv|
      csv << attributes

      contacts.each do |contact|
        csv << attributes.map {|attr| contact.send(attr)}
      end
    end
  end
end
