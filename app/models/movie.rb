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
end
