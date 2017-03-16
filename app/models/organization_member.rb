class OrganizationMember < ApplicationRecord
  belongs_to :user
  belongs_to :organization

  enum role: [:admin, :user]
end
