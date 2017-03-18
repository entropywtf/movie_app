class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :average_rating
  has_many :comments
end
