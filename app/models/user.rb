class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable
  belongs_to :plan
  has_many :organization_members
  has_many :reviews
  has_many :dictionaries
  has_many :activities
  has_many :bookmarks
  has_many :categories
  has_many :organizations, through: :organization_members

  enum role: [:admin, :user]
end
