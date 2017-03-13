class DictionarySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :category, :words
  belongs_to :category
  has_many :words
end
