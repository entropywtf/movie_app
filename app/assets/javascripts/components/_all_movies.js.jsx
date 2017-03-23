var AllMovies = React.createClass({
  handleDelete(id) {
    this.props.handleDelete(id);
  },
  onUpdate(movie) {
    this.props.onUpdate(movie);
  },
  onRating(mh) {
    this.props.onRating(mh);
  },
  render() {
    var movies = this.props.movies.map((movie) => {
      return (
        <div key={movie.id}>
          <Movie movie={movie}
            handleDelete={this.handleDelete.bind(this, movie.id)}
            handleUpdate={this.onUpdate} signed_in={this.props.signed_in}
            handleRating={this.onRating} categories_names={this.props.categories}/>
        </div>
      )
    });

    return(
      <div id="all_movies_component">
        {movies}
      </div>
    )
  }
});
