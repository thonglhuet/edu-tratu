class CreateOrganizationMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :organization_members do |t|
      t.integer :role
      t.references :user, foreign_key: true
      t.references :organization, foreign_key: true

      t.timestamps
    end
  end
end
