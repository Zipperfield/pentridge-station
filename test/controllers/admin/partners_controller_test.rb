require_relative '../../test_helper'

class Admin::PartnersControllerTest < ActionDispatch::IntegrationTest

  setup do
    @partner = partners(:default)
  end

  # Vanilla CMS has BasicAuth, so we need to send that with each request.
  # Change this to fit your app's authentication strategy.
  # Move this to test_helper.rb
  def r(verb, path, options = {})
    headers = options[:headers] || {}
    headers['HTTP_AUTHORIZATION'] =
      ActionController::HttpAuthentication::Basic.encode_credentials(
        ComfortableMexicanSofa::AccessControl::AdminAuthentication.username,
        ComfortableMexicanSofa::AccessControl::AdminAuthentication.password
      )
    options.merge!(headers: headers)
    send(verb, path, options)
  end

  def test_get_index
    r :get, admin_partners_path
    assert_response :success
    assert assigns(:partners)
    assert_template :index
  end

  def test_get_show
    r :get, admin_partner_path(@partner)
    assert_response :success
    assert assigns(:partner)
    assert_template :show
  end

  def test_get_show_failure
    r :get, admin_partner_path('invalid')
    assert_response :redirect
    assert_redirected_to action: :index
    assert_equal 'Partner not found', flash[:danger]
  end

  def test_get_new
    r :get, new_admin_partner_path
    assert_response :success
    assert assigns(:partner)
    assert_template :new
    assert_select "form[action='/admin/partners']"
  end

  def test_get_edit
    r :get, edit_admin_partner_path(@partner)
    assert_response :success
    assert assigns(:partner)
    assert_template :edit
    assert_select "form[action='/admin/partners/#{@partner.id}']"
  end

  def test_creation
    assert_difference 'Partner.count' do
      r :post, admin_partners_path, params: {partner: {
        name: 'test name',
        tagline: 'test tagline',
        bio: 'test bio',
        price: 'test price',
        facebook: 'test facebook',
        instagram: 'test instagram',
        twitter: 'test twitter',
        website: 'test website',
      }}
      partner = Partner.last
      assert_response :redirect
      assert_redirected_to action: :show, id: partner
      assert_equal 'Partner created', flash[:success]
    end
  end

  def test_creation_failure
    assert_no_difference 'Partner.count' do
      r :post, admin_partners_path, params: {partner: { }}
      assert_response :success
      assert_template :new
      assert_equal 'Failed to create Partner', flash[:danger]
    end
  end

  def test_update
    r :put, admin_partner_path(@partner), params: {partner: {
      name: 'Updated'
    }}
    assert_response :redirect
    assert_redirected_to action: :show, id: @partner
    assert_equal 'Partner updated', flash[:success]
    @partner.reload
    assert_equal 'Updated', @partner.name
  end

  def test_update_failure
    r :put, admin_partner_path(@partner), params: {partner: {
      name: ''
    }}
    assert_response :success
    assert_template :edit
    assert_equal 'Failed to update Partner', flash[:danger]
    @partner.reload
    refute_equal '', @partner.name
  end

  def test_destroy
    assert_difference 'Partner.count', -1 do
      r :delete, admin_partner_path(@partner)
      assert_response :redirect
      assert_redirected_to action: :index
      assert_equal 'Partner deleted', flash[:success]
    end
  end
end
