class Movie < ApplicationRecord
  has_many :ratings
  has_many :comments
  has_and_belongs_to_many :categories

  attr_accessor :average_rating
  def average_rating
    rs = ratings
    return 0 if rs.blank?
    return rs.sum(:score) / rs.size
  end

  def self.group_by_ratings_scores
    star_hash = { 5 => [], 4=> [], 3 => [], 2 => [], 1 => [], 0 => [] }
    return Movie.all.reduce(star_hash) do |acc, m|
      acc[m.average_rating] ||= []
      acc[m.average_rating] << m
      acc
    end.map do |k,v|
      { "id" => k, "movies" => v }
    end
  end
end
