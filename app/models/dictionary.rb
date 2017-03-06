class Dictionary < ApplicationRecord
  belongs_to :category
  belongs_to :user
  has_many :shared_dictionaries
  has_many :organizations, through: :shared_dictionaries
end
