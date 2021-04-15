require_relative '../test_helper'

class PartnerTest < ActiveSupport::TestCase

  def test_fixtures_validity
    Partner.all.each do |partner|
      assert partner.valid?, partner.errors.inspect
    end
  end

  def test_validation
    partner = Partner.new
    assert partner.invalid?
    assert_equal [:name, :tagline, :bio, :price, :facebook, :instagram, :twitter, :website], partner.errors.keys
  end

  def test_creation
    assert_difference 'Partner.count' do
      Partner.create(
        name: 'test name',
        tagline: 'test tagline',
        bio: 'test bio',
        price: 'test price',
        facebook: 'test facebook',
        instagram: 'test instagram',
        twitter: 'test twitter',
        website: 'test website',
      )
    end
  end
end
