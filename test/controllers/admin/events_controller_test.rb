require_relative '../../test_helper'

class Admin::EventsControllerTest < ActionDispatch::IntegrationTest

  setup do
    @event = events(:default)
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
    r :get, admin_events_path
    assert_response :success
    assert assigns(:events)
    assert_template :index
  end

  def test_get_show
    r :get, admin_event_path(@event)
    assert_response :success
    assert assigns(:event)
    assert_template :show
  end

  def test_get_show_failure
    r :get, admin_event_path('invalid')
    assert_response :redirect
    assert_redirected_to action: :index
    assert_equal 'Event not found', flash[:danger]
  end

  def test_get_new
    r :get, new_admin_event_path
    assert_response :success
    assert assigns(:event)
    assert_template :new
    assert_select "form[action='/admin/events']"
  end

  def test_get_edit
    r :get, edit_admin_event_path(@event)
    assert_response :success
    assert assigns(:event)
    assert_template :edit
    assert_select "form[action='/admin/events/#{@event.id}']"
  end

  def test_creation
    assert_difference 'Event.count' do
      r :post, admin_events_path, params: {event: {
        date: 'test date',
        start: 'test start',
        additional_time: 'test additional_time',
        event_type: 'test event_type',
        contact: 'test contact',
      }}
      event = Event.last
      assert_response :redirect
      assert_redirected_to action: :show, id: event
      assert_equal 'Event created', flash[:success]
    end
  end

  def test_creation_failure
    assert_no_difference 'Event.count' do
      r :post, admin_events_path, params: {event: { }}
      assert_response :success
      assert_template :new
      assert_equal 'Failed to create Event', flash[:danger]
    end
  end

  def test_update
    r :put, admin_event_path(@event), params: {event: {
      date: 'Updated'
    }}
    assert_response :redirect
    assert_redirected_to action: :show, id: @event
    assert_equal 'Event updated', flash[:success]
    @event.reload
    assert_equal 'Updated', @event.date
  end

  def test_update_failure
    r :put, admin_event_path(@event), params: {event: {
      date: ''
    }}
    assert_response :success
    assert_template :edit
    assert_equal 'Failed to update Event', flash[:danger]
    @event.reload
    refute_equal '', @event.date
  end

  def test_destroy
    assert_difference 'Event.count', -1 do
      r :delete, admin_event_path(@event)
      assert_response :redirect
      assert_redirected_to action: :index
      assert_equal 'Event deleted', flash[:success]
    end
  end
end
