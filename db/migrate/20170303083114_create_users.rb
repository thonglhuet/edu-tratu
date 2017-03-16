class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email, null: false, default: ""
      t.string :encrypted_password, null: false, default: ""
      t.string :address
      t.string :image
      t.string :phone
      t.integer :role, default: 1
      t.string :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at

      t.timestamps
    end
  end
end
