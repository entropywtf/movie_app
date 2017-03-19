class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories do |t|
      t.string :name

      t.timestamps
    end
    ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime",
      "Documentary", "Drama", "Family", "Fantasy", "History", "Horror",
      "Musical", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War",
      "Western"].each do |name|
      Category.create(name: name)
      end
  end
end
