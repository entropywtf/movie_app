class Api::V1::MoviesController < Api::V1::BaseController
  before_action :authenticate_user!, except: [:index, :show, :search]

  def index
    page_params = { page: params[:page], per_page: 10 }
    movies = Movie.all.paginate(page_params)
    respond_with movies, json: movies, total: movies.total_entries
  end

  def create
    movie = Movie.new(movie_params)
    handle_categories!(movie)
    if movie.save
      respond_with :api, :v1, movie
    else
      respond_with movie, status: :unprocessable_entity
    end
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

  def search
    page_params = { page: params[:page], per_page: 10 }
    movies = Movie.where("description ILIKE '%#{movie_params[:term]}%'").
      paginate(page_params)
    respond_with movies, json:  movies, total: movies.total_entries
  end

  private

  def movie_params
    params.require(:movie).permit(:id, :title, :description, :term, :page)
  end

  def handle_categories!(movie)
    if cats = params["movie"]["selected_categories"]
      movie.assign_selected_categories(cats)
    end
  end
end
