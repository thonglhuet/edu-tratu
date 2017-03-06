class SharedDictionary < ApplicationRecord
  belongs_to :dictionary
  belongs_to :organization
end
