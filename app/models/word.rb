class Word < ApplicationRecord
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged
  belongs_to :dictionary
  has_many :word_details
  has_many :bookmarks

  validates :content, presence: true
  validates :meaning, presence: true
  scope :sought, lambda {|q, category_id|
    joins(:dictionary).merge(Dictionary.find_by_category(category_id))
      .where "content LIKE ?", "%#{q}%" if q.present?
  }
  ATTR_PARAMS = [:content, :meaning, :dictionary_id].freeze

  def slug_candidates
    [
      :content,
      [:content, :id]
    ]
  end
end
