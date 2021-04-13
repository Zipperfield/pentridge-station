class CreateContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.integer :entry_process
      t.references :message, foreign_key: true

      t.timestamps
    end
  end
end
