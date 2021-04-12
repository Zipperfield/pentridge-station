require_relative '../../test_helper'

class Admin::LocationsControllerTest < ActionDispatch::IntegrationTest

  setup do
    @location = locations(:default)
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
    r :get, admin_locations_path
    assert_response :success
    assert assigns(:locations)
    assert_template :index
  end

  def test_get_show
    r :get, admin_location_path(@location)
    assert_response :success
    assert assigns(:location)
    assert_template :show
  end

  def test_get_show_failure
    r :get, admin_location_path('invalid')
    assert_response :redirect
    assert_redirected_to action: :index
    assert_equal 'Location not found', flash[:danger]
  end

  def test_get_new
    r :get, new_admin_location_path
    assert_response :success
    assert assigns(:location)
    assert_template :new
    assert_select "form[action='/admin/locations']"
  end

  def test_get_edit
    r :get, edit_admin_location_path(@location)
    assert_response :success
    assert assigns(:location)
    assert_template :edit
    assert_select "form[action='/admin/locations/#{@location.id}']"
  end

  def test_creation
    assert_difference 'Location.count' do
      r :post, admin_locations_path, params: {location: {
        name: 'test name',
        distance: 'test distance',
      }}
      location = Location.last
      assert_response :redirect
      assert_redirected_to action: :show, id: location
      assert_equal 'Location created', flash[:success]
    end
  end

  def test_creation_failure
    assert_no_difference 'Location.count' do
      r :post, admin_locations_path, params: {location: { }}
      assert_response :success
      assert_template :new
      assert_equal 'Failed to create Location', flash[:danger]
    end
  end

  def test_update
    r :put, admin_location_path(@location), params: {location: {
      name: 'Updated'
    }}
    assert_response :redirect
    assert_redirected_to action: :show, id: @location
    assert_equal 'Location updated', flash[:success]
    @location.reload
    assert_equal 'Updated', @location.name
  end

  def test_update_failure
    r :put, admin_location_path(@location), params: {location: {
      name: ''
    }}
    assert_response :success
    assert_template :edit
    assert_equal 'Failed to update Location', flash[:danger]
    @location.reload
    refute_equal '', @location.name
  end

  def test_destroy
    assert_difference 'Location.count', -1 do
      r :delete, admin_location_path(@location)
      assert_response :redirect
      assert_redirected_to action: :index
      assert_equal 'Location deleted', flash[:success]
    end
  end
end
