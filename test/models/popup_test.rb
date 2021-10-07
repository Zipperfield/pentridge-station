require_relative '../test_helper'

class PopupTest < ActiveSupport::TestCase

  def test_fixtures_validity
    Popup.all.each do |popup|
      assert popup.valid?, popup.errors.inspect
    end
  end

  def test_validation
    popup = Popup.new
    assert popup.invalid?
    assert_equal [:title, :body, :status], popup.errors.keys
  end

  def test_creation
    assert_difference 'Popup.count' do
      Popup.create(
        title: 'test title',
        body: 'test body',
        status: 'test status',
      )
    end
  end
end
