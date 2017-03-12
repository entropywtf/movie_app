var AllMovies = React.createClass({
  handleDelete(id) {
    this.props.handleDelete(id);
  },
  onUpdate(movie) {
    this.props.onUpdate(movie);
  },
  render() {
    var movies = this.props.movies.map((movie) => {
      return (
        <div key={movie.id}>
          <Movie movie={movie}
            handleDelete={this.handleDelete.bind(this, movie.id)}
            handleUpdate={this.onUpdate}/>
        </div>
      )
    });

    return(
      <div>
        {movies}
      </div>
    )
  }
});
