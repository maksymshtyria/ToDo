class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :title
      t.string :project
      t.integer :order
      t.boolean :done

      t.timestamps
    end
  end
end
