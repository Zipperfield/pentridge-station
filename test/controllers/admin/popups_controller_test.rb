require_relative '../../test_helper'

class Admin::PopupsControllerTest < ActionDispatch::IntegrationTest

  setup do
    @popup = popups(:default)
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
    r :get, admin_popups_path
    assert_response :success
    assert assigns(:popups)
    assert_template :index
  end

  def test_get_show
    r :get, admin_popup_path(@popup)
    assert_response :success
    assert assigns(:popup)
    assert_template :show
  end

  def test_get_show_failure
    r :get, admin_popup_path('invalid')
    assert_response :redirect
    assert_redirected_to action: :index
    assert_equal 'Popup not found', flash[:danger]
  end

  def test_get_new
    r :get, new_admin_popup_path
    assert_response :success
    assert assigns(:popup)
    assert_template :new
    assert_select "form[action='/admin/popups']"
  end

  def test_get_edit
    r :get, edit_admin_popup_path(@popup)
    assert_response :success
    assert assigns(:popup)
    assert_template :edit
    assert_select "form[action='/admin/popups/#{@popup.id}']"
  end

  def test_creation
    assert_difference 'Popup.count' do
      r :post, admin_popups_path, params: {popup: {
        title: 'test title',
        body: 'test body',
        status: 'test status',
      }}
      popup = Popup.last
      assert_response :redirect
      assert_redirected_to action: :show, id: popup
      assert_equal 'Popup created', flash[:success]
    end
  end

  def test_creation_failure
    assert_no_difference 'Popup.count' do
      r :post, admin_popups_path, params: {popup: { }}
      assert_response :success
      assert_template :new
      assert_equal 'Failed to create Popup', flash[:danger]
    end
  end

  def test_update
    r :put, admin_popup_path(@popup), params: {popup: {
      title: 'Updated'
    }}
    assert_response :redirect
    assert_redirected_to action: :show, id: @popup
    assert_equal 'Popup updated', flash[:success]
    @popup.reload
    assert_equal 'Updated', @popup.title
  end

  def test_update_failure
    r :put, admin_popup_path(@popup), params: {popup: {
      title: ''
    }}
    assert_response :success
    assert_template :edit
    assert_equal 'Failed to update Popup', flash[:danger]
    @popup.reload
    refute_equal '', @popup.title
  end

  def test_destroy
    assert_difference 'Popup.count', -1 do
      r :delete, admin_popup_path(@popup)
      assert_response :redirect
      assert_redirected_to action: :index
      assert_equal 'Popup deleted', flash[:success]
    end
  end
end
