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
      <div>
         <NewMovie handleSubmit={this.handleSubmit}/>
         <AllMovies movies={this.state.movies} handleDelete={this.handleDelete}
           onUpdate={this.handleUpdate}/>
      </div>
    )
  }
});