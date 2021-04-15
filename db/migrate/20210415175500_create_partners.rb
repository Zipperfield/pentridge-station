class CreatePartners < ActiveRecord::Migration[5.2]

  def change
    create_table :partners do |t|
      t.boolean :vendor
      t.boolean :musician
      t.string :name
      t.string :tagline
      t.text :bio
      t.integer :low_price
      t.integer :high_price
      t.string :facebook
      t.string :instagram
      t.string :twitter
      t.string :website
      t.timestamps
    end
  end
end
