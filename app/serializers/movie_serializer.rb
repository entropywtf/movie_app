class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :average_rating, :categories
  has_many :comments
end
