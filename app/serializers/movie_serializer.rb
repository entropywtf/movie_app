class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :average_rating, :categories_names, :total_count
  has_many :comments
end
