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
    var newState = [movie].concat(this.state.movies);
    this.showNotification("Movie '" + movie.title + "' created.", "success");
    this.setState({ movies: newState })
  },
  handleFail(movie) {
    var errors = movie.responseText; //XXX: prettify
    this.showNotification("Failed to create: " + errors, "error");
  },
  handleDelete(id){
    $.ajax({
      url: `/api/v1/movies/${id}`,
      type: 'DELETE',
      success:() => {
        this.removeMovieClient(id);
        this.showNotification("Deleted.", "success");
      }
    });
  },
  showNotification(msg, template){
    $("#alert").jqxNotification({
        width: "auto",
        position: "bottom-right",
        opacity: 0.9,
        autoOpen: false,
        autoClose: true,
        template: template
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
        this.showNotification("Successfully rated!", "success");
      }
    }
  )},
  updateSideRatingClient() {
    $.getJSON('/api/v1/ratings.json', (response) => {
      this.setState({ ratings: response }) });
  },
  updateSideCategoryClient() {
    $.getJSON('/api/v1/categories.json', (response) => {
      this.setState({ categories: response }) });
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
        this.updateSideCategoryClient();
        this.showNotification("Movie '" + movie.title + "' successfully updated!",
          "success");
      }
    }
  )},
  updateMovies(movie) {
    var movies = this.state.movies.filter((m) => { return m.id !== movie.id });
    movies.unshift(movie); // An updated movie climbs to the top
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
    var options = this.state.categories.map(function(category) {
      return { value: category.name, label: category.name }
    });
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
            <NewMovie handleSubmit={this.handleSubmit} handleFail={this.handleFail}
              categories={this.state.categories} options={options}/>
          }
          <AllMovies movies={this.state.movies} handleDelete={this.handleDelete}
            onUpdate={this.handleUpdate} signed_in={this.props.signed_in}
            onRating={this.handleRating} categories={this.state.categories}
            options={options}/>
        </div>
      </div>
    )
  }
});
