class Organization < ApplicationRecord
  has_many :organization_members, dependent: :destroy
  has_many :shared_dictionaries, dependent: :destroy
  has_many :users, through: :organization_members
  has_many :dictionaries, through: :shared_dictionaries

  validates :name, presence: true, length: {minimum: 5}
  ATTR_PARAMS = [:name, :description].freeze

  def create_organization_owner user
    OrganizationMember.create! user_id: user.id, organization_id: id
  end

  scope :search_organization, lambda{|user_id|
    where "id IN (SELECT organization_id from organization_members
      as om INNER JOIN users as u on om.user_id = u.id
        where om.role = 0 and u.id = #{user_id})"
  }
end
