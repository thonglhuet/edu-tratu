class Word < ApplicationRecord
  belongs_to :dictionary
  has_many :word_details
  has_many :bookmarks

  scope :sought, lambda {|q, category_id|
    joins(:dictionary).merge(Dictionary.find_by_category(category_id))
      .where "content LIKE ?", "%#{q}%" if q.present?
  }
end
