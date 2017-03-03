class Organization < ApplicationRecord
  has_many :organization_members
  has_many :shared_dictionaries
  has_many :users, through: :organization_members
  has_many :dictionaries, through: :shared_dictionaries
end
