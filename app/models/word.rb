class Word < ApplicationRecord
  belongs_to :dictionary
  has_many :word_details
  has_many :bookmarks
end
