class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :dictionaries
  has_many :dictionaries
end
