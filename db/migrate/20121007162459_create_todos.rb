class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.integer :projectID
      t.integer :taskID
      t.string :task

      t.timestamps
    end
  end
end
