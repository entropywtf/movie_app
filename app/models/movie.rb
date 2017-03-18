class Movie < ApplicationRecord
  has_many :ratings
  has_many :comments

  attr_accessor :average_rating
  def average_rating
    rs = ratings
    return 0 if rs.blank?
    return rs.sum(:score) / rs.size
  end
end
