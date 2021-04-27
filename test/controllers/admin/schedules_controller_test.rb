require_relative '../../test_helper'

class Admin::SchedulesControllerTest < ActionDispatch::IntegrationTest

  setup do
    @schedule = schedules(:default)
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
    r :get, admin_schedules_path
    assert_response :success
    assert assigns(:schedules)
    assert_template :index
  end

  def test_get_show
    r :get, admin_schedule_path(@schedule)
    assert_response :success
    assert assigns(:schedule)
    assert_template :show
  end

  def test_get_show_failure
    r :get, admin_schedule_path('invalid')
    assert_response :redirect
    assert_redirected_to action: :index
    assert_equal 'Schedule not found', flash[:danger]
  end

  def test_get_new
    r :get, new_admin_schedule_path
    assert_response :success
    assert assigns(:schedule)
    assert_template :new
    assert_select "form[action='/admin/schedules']"
  end

  def test_get_edit
    r :get, edit_admin_schedule_path(@schedule)
    assert_response :success
    assert assigns(:schedule)
    assert_template :edit
    assert_select "form[action='/admin/schedules/#{@schedule.id}']"
  end

  def test_creation
    assert_difference 'Schedule.count' do
      r :post, admin_schedules_path, params: {schedule: {
        date: 'test date',
        description: 'test description',
      }}
      schedule = Schedule.last
      assert_response :redirect
      assert_redirected_to action: :show, id: schedule
      assert_equal 'Schedule created', flash[:success]
    end
  end

  def test_creation_failure
    assert_no_difference 'Schedule.count' do
      r :post, admin_schedules_path, params: {schedule: { }}
      assert_response :success
      assert_template :new
      assert_equal 'Failed to create Schedule', flash[:danger]
    end
  end

  def test_update
    r :put, admin_schedule_path(@schedule), params: {schedule: {
      date: 'Updated'
    }}
    assert_response :redirect
    assert_redirected_to action: :show, id: @schedule
    assert_equal 'Schedule updated', flash[:success]
    @schedule.reload
    assert_equal 'Updated', @schedule.date
  end

  def test_update_failure
    r :put, admin_schedule_path(@schedule), params: {schedule: {
      date: ''
    }}
    assert_response :success
    assert_template :edit
    assert_equal 'Failed to update Schedule', flash[:danger]
    @schedule.reload
    refute_equal '', @schedule.date
  end

  def test_destroy
    assert_difference 'Schedule.count', -1 do
      r :delete, admin_schedule_path(@schedule)
      assert_response :redirect
      assert_redirected_to action: :index
      assert_equal 'Schedule deleted', flash[:success]
    end
  end
end
