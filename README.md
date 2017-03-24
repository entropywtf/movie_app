# Movie App flying Ruby on Rails(RESTful API) & ReactJS

## What does it provide:
* If not signed in, users can only you view, search and filter
* If signed in, users can manage(C(R)UD) movie objects and rate them without a page reload. Each user has only one rate for each movie, which he can easily update (if the movie gets 5 Oscars and suddenly it's not that bad). Each logged-in user can create a movie, although it doesn't belong to one. Presence of title and description will be validated.
* Not taking into account a sign-in page, there is only one home page, where the whole react magic happens. It comprises navigation login panel, sidebar with the facets to filter movies by a category or rating.
* Button to reset filter results takes care of the listing to get back to the initial state without a page reload.
* You can full text search in the title or description of the movie and results will be displayed instantly without a page reload.
* The pagination is set to show 10 entries per page navigating you to the desired page without a page reload.
* The stars use graphics both in each movie entry and at the sidebar.

##Ruby / Rails
```
ruby 2.3.0p0 (2015-12-25 revision 53290) [x86_64-darwin15]
Rails 5.0.2
psql (PostgreSQL) 9.6.2
```
##Run the tests
```
git clone git@github.com:entropyftw/movie_app.git
cd movie_app
rails db:create db:migrate db:fixtures:load
ruby -I lib:test (or rails test etc.) test/controllers/categories_controller_test.rb
ruby -I lib:test (or rails test etc.) test/controllers/movies_controller_test.rb
ruby -I lib:test (or rails test etc.) test/controllers/ratings_controller_test.rb
or start a server with `rails s` and test API with `curl`
```
##So much to code so little time
```
* Commenting (db table is there but proper show page for a movie should be implemeted to display them)
* Better check(validation) for user input params(fow the sake of security)
* Picture upload with thumbnails
* Add rating on creation
* Clear inputs after creating a movie
* Prettify errors output and user nofitications in general.
* ...
```
