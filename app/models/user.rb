class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable, :omniauthable
  belongs_to :plan
  has_many :organization_members
  has_many :reviews
  has_many :dictionaries
  has_many :activities
  has_many :bookmarks
  has_many :categories
  has_many :organizations, through: :organization_members

  enum role: [:admin, :user]
  scope :sought, ->(q, user_id) { where "name LIKE ? AND id <> ?",
    "%#{q}%", "#{user_id}" if q.present? }

  class << self
    def from_omniauth auth
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.provider = auth.provider
        user.uid = auth.uid
        user.email = auth.info.email.nil? ?
          "#{auth.uid}@framgia.com" : auth.info.email
        user.phone = auth.info.phone
        user.address = auth.info.address
        user.image = auth.info.image + "?type=large"
        user.password = Devise.friendly_token[0,20]
        user.name = auth.info.name
        user.save!
      end
    end
  end
end
