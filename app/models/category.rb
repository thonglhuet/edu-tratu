class Category < ApplicationRecord
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged
  belongs_to :user
  has_many :dictionaries

  validates :name, presence: true, length: {minimum: 5}
  validates :description, presence: true, length: {minimum: 5}
  ATTR_PARAMS = [:name, :description].freeze
  accepts_nested_attributes_for :dictionaries

  def slug_candidates
    [
      :name,
      [:name, :id]
    ]
  end
end
