class CreateWordDetails < ActiveRecord::Migration[5.0]
  def change
    create_table :word_details do |t|
      t.string :kind
      t.text :meaning
      t.references :word, foreign_key: true

      t.timestamps
    end
  end
end
