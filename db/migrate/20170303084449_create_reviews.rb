class CreateReviews < ActiveRecord::Migration[5.0]
  def change
    create_table :reviews do |t|
      t.float :rating
      t.references :dictionary, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
