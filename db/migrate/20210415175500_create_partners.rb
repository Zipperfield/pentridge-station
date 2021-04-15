class CreatePartners < ActiveRecord::Migration[5.2]

  def change
    create_table :partners do |t|
      t.string :name
      t.string :tagline
      t.text :bio
      t.integer :price
      t.string :facebook
      t.string :instagram
      t.string :twitter
      t.string :website
      t.timestamps
    end
  end
end
