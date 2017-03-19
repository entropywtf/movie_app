class CreateCategoriesMovies < ActiveRecord::Migration[5.0]
  def change
    create_table :categories_movies do |t|
      t.integer :category_id
      t.integer :movie_id
    end
  end
end
