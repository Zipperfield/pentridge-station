require_relative '../test_helper'

class ScheduleTest < ActiveSupport::TestCase

  def test_fixtures_validity
    Schedule.all.each do |schedule|
      assert schedule.valid?, schedule.errors.inspect
    end
  end

  def test_validation
    schedule = Schedule.new
    assert schedule.invalid?
    assert_equal [:date, :description], schedule.errors.keys
  end

  def test_creation
    assert_difference 'Schedule.count' do
      Schedule.create(
        date: 'test date',
        description: 'test description',
      )
    end
  end
end
