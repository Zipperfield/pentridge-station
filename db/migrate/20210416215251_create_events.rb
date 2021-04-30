class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.date :date
      t.time :start_time
      t.time :end_time
      t.integer :num_attendees
      t.integer :additional_time
      t.integer :event_type
      t.references :contact, null: false, foreign_key: true

      t.timestamps
    end
  end
end
