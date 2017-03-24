class Movie < ApplicationRecord
  has_many :ratings
  has_many :comments
  has_and_belongs_to_many :categories

  validates_presence_of :title
  validates_presence_of :description

  attr_accessor :average_rating

  def average_rating
    rs = ratings
    return 0 if rs.blank?
    return rs.sum(:score) / rs.size
  end

  def self.group_by_ratings_scores
    star_hash = (0..5).to_a.sort{ |a,b| b <=> a }.reduce({}){ |acc, k| acc[k] = []; acc }
    return Movie.all.reduce(star_hash) do |acc, m|
      acc[m.average_rating] ||= []
      acc[m.average_rating] << m
      acc
    end.map do |k,v|
      { "id" => k, "movies" => v }
    end
  end

  def assign_selected_categories(cats)
    selected_names = cats.split(",")
    self.categories = selected_names.map{|n| Category.find_by_name(n)}
  end

  def categories_names
    self.categories.pluck(:name)
  end
end
