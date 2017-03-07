class Dictionary < ApplicationRecord
  belongs_to :category
  belongs_to :user
  has_many :shared_dictionaries
  has_many :organizations, through: :shared_dictionaries
  has_many :words

  scope :find_by_category, ->category_id do
    where category_id: category_id
  end
end
