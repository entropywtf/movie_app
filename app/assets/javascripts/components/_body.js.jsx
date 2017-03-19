var Body = React.createClass({
  getInitialState() {
    return { movies: [] }
  },
  componentDidMount() {
    $.getJSON('/api/v1/movies.json', (response) => { this.setState({ movies:
      response }) });
  },
  handleSubmit(movie) {
    var newState = this.state.movies.concat(movie);
    this.setState({ movies: newState })
  },
  handleDelete(id){
    $.ajax({
      url: `/api/v1/movies/${id}`,
      type: 'DELETE',
      success:() => {
        this.removeMovieClient(id);
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
        this.showNotification("Your rating successfully updated!");
      }
    }
  )},
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
    movies.push(movie);
    this.setState({movies: movies});
  },
  render() {
    return (
      <div id="body_component">
         {this.props.signed_in &&
           <NewMovie handleSubmit={this.handleSubmit}/>
         }
         <AllMovies movies={this.state.movies} handleDelete={this.handleDelete}
           onUpdate={this.handleUpdate} signed_in={this.props.signed_in}
           onRating={this.handleRating}/>
      </div>
    )
  }
});
