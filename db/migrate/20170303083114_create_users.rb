class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :encrypted_password
      t.string :address
      t.string :image
      t.string :phone
      t.string :reset_password_token
      t.Datetime :reset_password_sent_at
      t.Datetime :remember_created_at
      t.references :plan, foreign_key: true

      t.timestamps
    end
  end
end
