class CreateSharedDictionaries < ActiveRecord::Migration[5.0]
  def change
    create_table :shared_dictionaries do |t|
      t.references :dictionary, foreign_key: true
      t.references :organization, foreign_key: true

      t.timestamps
    end
  end
end
