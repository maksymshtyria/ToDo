class CreateTests < ActiveRecord::Migration
  def change
    create_table :tests do |t|
      t.integer :id
      t.char :name

      t.timestamps
    end
  end
end
