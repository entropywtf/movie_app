var NewMovie = React.createClass({
  handleClick() {
    var title = this.refs.title.value;
    var description = this.refs.description.value;
    $.ajax({
      url: '/api/v1/movies',
      type: 'POST',
      data: { movie: { title: title, description: description } },
      success: (movie) => {
        this.props.handleSubmit(movie);
      }
    })
  },
  render() {
    return (
      <div id="new_component">
        <input type="text" className="form-control" ref='title' placeholder='Enter the title of the movie' />
        <input type="text" className="form-control" ref='description' placeholder='Enter a descriprion' />
        <button type="button" className="btn btn-success" onClick={this.handleClick}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
      </div>
    )
  }
});
