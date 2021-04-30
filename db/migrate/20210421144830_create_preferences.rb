class CreatePreferences < ActiveRecord::Migration[6.1]
  def change
    create_table :preferences do |t|
      t.integer :preference_type
      t.boolean :requested
      t.references :first_choice
      t.references :second_choice
      t.references :third_choice
      t.references :event, null: false, foreign_key: true

      t.timestamps
    end
    add_foreign_key :preferences, :partners, column: :first_choice_id
    add_foreign_key :preferences, :partners, column: :second_choice_id
    add_foreign_key :preferences, :partners, column: :third_choice_id
  end
end
