class Api::V1::MoviesController < Api::V1::BaseController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    respond_with Movie.all
  end

  def create
    movie = Movie.new(movie_params)
    handle_categories!(movie)
    movie.save
    respond_with :api, :v1, movie
  end

  def destroy
    respond_with Movie.destroy(params[:id])
  end

  def update
    movie = Movie.find(params["id"])
    handle_categories!(movie)
    movie.update_attributes(movie_params)
    respond_with movie, json: movie
  end

  def show
    movie = Movie.find(params["id"])
    respond_with movie, json: movie
  end

  private

  def movie_params
    params.require(:movie).permit(:id, :title, :description)
  end

  def handle_categories!(movie)
    if cats = params["movie"]["selected_categories"]
      movie.assign_selected_categories(cats)
    end
  end
end
