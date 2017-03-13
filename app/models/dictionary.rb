class Dictionary < ApplicationRecord
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged
  belongs_to :category
  belongs_to :user
  has_many :shared_dictionaries
  has_many :organizations, through: :shared_dictionaries
  has_many :words

  validates :name, presence: true, length: {minimum: 5}
  validates :description, presence: true, length: {minimum: 5}

  scope :find_by_category, lambda {|category_id|
    where category_id: category_id
  }
  scope :order_by, ->by{order("#{by}")}
  ATTR_PARAMS = [:name, :description, :category_id].freeze
  ATTR_PARAMS_NESTED = [:name, :description, :user_id].freeze

  def slug_candidates
    [
      :name,
      [:name, :id]
    ]
  end
end
