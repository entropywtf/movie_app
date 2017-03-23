var Body = React.createClass({
  getInitialState() {
    return { movies: [], categories: [], ratings: [] }
  },
  componentDidMount() {
    $.getJSON('/api/v1/movies.json', (response) => { this.setState({ movies:
      response }) });
    $.getJSON('/api/v1/categories.json', (response) => {
      this.setState({ categories: response }) });
    $.getJSON('/api/v1/ratings.json', (response) => {
      this.setState({ ratings: response }) });
  },
  handleSubmit(movie) {
    var newState = this.state.movies.concat(movie);
    this.showNotification("Movie '" + movie.title + "' created.");
    this.setState({ movies: newState })
  },
  handleDelete(id){
    $.ajax({
      url: `/api/v1/movies/${id}`,
      type: 'DELETE',
      success:() => {
        this.removeMovieClient(id);
        this.showNotification("Deleted.");
      }
    });
  },
  showNotification(msg){
    $("#alert").jqxNotification({
        width: "auto",
        position: "bottom-right",
        opacity: 0.9,
        autoOpen: false,
        autoClose: true,
        template: "success"
    });
    $("#alert").text(msg);
    $("#alert").jqxNotification("open");
  },
  handleRating(mh){
    $.ajax({
      url: '/api/v1/ratings',
      type: 'POST',
      data: {rating: {movie_id: mh.movie.id, score: mh.current_rating}},
      success: () => {
        this.updateMovies(mh.movie);
        this.updateSideRatingClient();
        this.showNotification("Successfully rated!");
      }
    }
  )},
  updateSideRatingClient() {
    $.getJSON('/api/v1/ratings.json', (response) => {
      this.setState({ ratings: response }) });
  },
  removeMovieClient(id) {
    var newMovies = this.state.movies.filter((movie) => {
      return movie.id !== id;
    });
    this.setState({ movies: newMovies });
  },
  handleUpdate(movie){
    $.ajax({
      url: `/api/v1/movies/${movie.id}`,
      type: 'PUT',
      data: {movie: movie},
      success: () => {
        this.updateMovies(movie);
        this.showNotification("Movie '" + movie.title + "' successfully updated!");
      }
    }
  )},
  updateMovies(movie) {
    var movies = this.state.movies.filter((m) => { return m.id !== movie.id });
    movies.push(movie); // An updated movie flies to the bottom
    this.setState({movies: movies});
  },
  handleCategoryFilter(category){
    this.setState({movies: category.movies});
  },
  handleRatingFilter(rating){
    this.setState({movies: rating.movies});
  },
  resetAllFilters() {
    this.setState(this.componentDidMount());
  },
  render() {
    return (
      <div id="body_component">
        <div id="alert"></div>
        <div className="side_bar">
          <button type="button" className="btn btn-default" onClick={this.resetAllFilters}>
            Reset filters <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span></button>
          <b> Categories: </b>
          <AllCategories categories={this.state.categories}
            handleCategoryFilter={this.handleCategoryFilter}/>
          <b> Ratings: </b>
          <AllRatings ratings={this.state.ratings}
            handleRatingFilter={this.handleRatingFilter}/>
        </div>
        <div className="movie_list">
          {this.props.signed_in &&
            <NewMovie handleSubmit={this.handleSubmit} categories={this.state.categories}/>
          }
          <AllMovies movies={this.state.movies} handleDelete={this.handleDelete}
            onUpdate={this.handleUpdate} signed_in={this.props.signed_in}
            onRating={this.handleRating} categories={this.state.categories}/>
        </div>
      </div>
    )
  }
});
