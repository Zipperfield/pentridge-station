class AddDetailsToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :doorperson, :boolean
    add_column :events, :alcohol, :boolean
    add_column :events, :open_bar, :boolean
  end
end
