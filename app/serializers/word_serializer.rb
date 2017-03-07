class WordSerializer < ActiveModel::Serializer
  attributes :id, :content, :meaning
  has_many :word_details
end
