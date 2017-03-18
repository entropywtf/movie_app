class Api::V1::RatingsController < Api::V1::BaseController
  before_action :authenticate_user!

  def create
    if existing_rating.present?
      update
    else
      respond_with :api, :v1, Rating.create(rating_params)
    end
  end

  def update
    existing_rating.update_attributes(score: rating_params["score"])
    respond_with existing_rating, json: existing_rating
  end

  private

  def existing_rating
    return Rating.where(movie_id: rating_params["movie_id"], user_id: current_user.id).
      first
  end

  def rating_params
    params.require(:rating).permit(:score, :movie_id).merge(user_id: current_user.id)
  end

end
