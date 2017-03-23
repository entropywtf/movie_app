class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :average_rating, :categories_names
  has_many :comments
end
