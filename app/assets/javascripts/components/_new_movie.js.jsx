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
      <div>
        <input ref='title' placeholder='Enter the title of the movie' />
        <input ref='description' placeholder='Enter a descriprion' />
          <button onClick={this.handleClick}>Submit</button>
      </div>
    )
  }
});
