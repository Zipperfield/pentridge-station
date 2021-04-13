require_relative '../test_helper'

class MessageTest < ActiveSupport::TestCase

  def test_fixtures_validity
    Message.all.each do |message|
      assert message.valid?, message.errors.inspect
    end
  end

  def test_validation
    message = Message.new
    assert message.invalid?
    assert_equal [:body, :contact], message.errors.keys
  end

  def test_creation
    assert_difference 'Message.count' do
      Message.create(
        body: 'test body',
        contact: 'test contact',
      )
    end
  end
end
