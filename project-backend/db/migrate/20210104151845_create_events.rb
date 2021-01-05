class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :name
      t.string :description
      t.string  :date
      t.string :time
      t.integer :city_id

      t.timestamps
    end
  end
end
