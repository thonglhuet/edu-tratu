class User < ApplicationRecord
  belongs_to :plan
  has_many :organization_members
  has_many :reviews
  has_many :dictionaries
  has_many :activities
  has_many :bookmarks
  has_many :categories
  has_many :organization, through: :organization_members

end
