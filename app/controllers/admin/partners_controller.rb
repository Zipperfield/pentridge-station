class Admin::PartnersController < Comfy::Admin::BaseController

  before_action :build_partner,  only: [:new, :create]
  before_action :load_partner,   only: [:show, :edit, :update, :destroy]

  def index
    @partners = Partner.page(params[:page])
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
    @partner.save!
    flash[:success] = 'Partner created'
    redirect_to action: :show, id: @partner
  rescue ActiveRecord::RecordInvalid
    flash.now[:danger] = 'Failed to create Partner'
    render action: :new
  end

  def update
    @partner.update!(partner_params)
    flash[:success] = 'Partner updated'
    redirect_to action: :show, id: @partner
  rescue ActiveRecord::RecordInvalid
    flash.now[:danger] = 'Failed to update Partner'
    render action: :edit
  end

  def destroy
    @partner.destroy
    flash[:success] = 'Partner deleted'
    redirect_to action: :index
  end

protected

  def build_partner
    @partner = Partner.new(partner_params)
  end

  def load_partner
    @partner = Partner.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    flash[:danger] = 'Partner not found'
    redirect_to action: :index
  end

  def partner_params
    params.fetch(:partner, {}).permit(:category, :name, :tagline, 
                                      :bio, :low_price, :high_price, 
                                      :facebook, :instagram, :twitter,
                                      :website)
  end
end
