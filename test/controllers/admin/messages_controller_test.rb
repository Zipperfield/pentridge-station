require_relative '../../test_helper'

class Admin::MessagesControllerTest < ActionDispatch::IntegrationTest

  setup do
    @message = messages(:default)
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
    r :get, admin_messages_path
    assert_response :success
    assert assigns(:messages)
    assert_template :index
  end

  def test_get_show
    r :get, admin_message_path(@message)
    assert_response :success
    assert assigns(:message)
    assert_template :show
  end

  def test_get_show_failure
    r :get, admin_message_path('invalid')
    assert_response :redirect
    assert_redirected_to action: :index
    assert_equal 'Message not found', flash[:danger]
  end

  def test_get_new
    r :get, new_admin_message_path
    assert_response :success
    assert assigns(:message)
    assert_template :new
    assert_select "form[action='/admin/messages']"
  end

  def test_get_edit
    r :get, edit_admin_message_path(@message)
    assert_response :success
    assert assigns(:message)
    assert_template :edit
    assert_select "form[action='/admin/messages/#{@message.id}']"
  end

  def test_creation
    assert_difference 'Message.count' do
      r :post, admin_messages_path, params: {message: {
        body: 'test body',
        contact: 'test contact',
      }}
      message = Message.last
      assert_response :redirect
      assert_redirected_to action: :show, id: message
      assert_equal 'Message created', flash[:success]
    end
  end

  def test_creation_failure
    assert_no_difference 'Message.count' do
      r :post, admin_messages_path, params: {message: { }}
      assert_response :success
      assert_template :new
      assert_equal 'Failed to create Message', flash[:danger]
    end
  end

  def test_update
    r :put, admin_message_path(@message), params: {message: {
      body: 'Updated'
    }}
    assert_response :redirect
    assert_redirected_to action: :show, id: @message
    assert_equal 'Message updated', flash[:success]
    @message.reload
    assert_equal 'Updated', @message.body
  end

  def test_update_failure
    r :put, admin_message_path(@message), params: {message: {
      body: ''
    }}
    assert_response :success
    assert_template :edit
    assert_equal 'Failed to update Message', flash[:danger]
    @message.reload
    refute_equal '', @message.body
  end

  def test_destroy
    assert_difference 'Message.count', -1 do
      r :delete, admin_message_path(@message)
      assert_response :redirect
      assert_redirected_to action: :index
      assert_equal 'Message deleted', flash[:success]
    end
  end
end
