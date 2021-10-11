class CreatePopups < ActiveRecord::Migration[5.2]

  def change
    create_table :popups do |t|
      t.string :title
      t.text :body
      t.boolean :status
      t.string :cookie
      t.timestamps
    end
  end
end
