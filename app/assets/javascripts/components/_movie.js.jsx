var Movie = React.createClass({
  getInitialState(){
    return {editable: false}
  },
  handleEdit(){
    if(this.state.editable) {
      var title = this.refs.title.value;
      var id = this.props.movie.id;
      var description = this.refs.description.value;
      var movie = {id: id, title: title, description: description};
      this.props.handleUpdate(movie);
    }
    this.setState({editable: !this.state.editable})
  },
  render() {
    var title = this.state.editable ? <input type='text' ref='title' defaultValue={this.
      props.movie.title} /> : <h3>{this.props.movie.title}</h3>;
    var description = this.state.editable ? <input type='text' ref='description' defaultValue={this.props.
      movie.description} /> : <h3>{this.props.movie.description}</h3>;
    return (
      <div>
        {title}
        {description}
        <button onClick={this.handleEdit}> {this.state.editable ? 'Submit' : 'Edit' } </button>
        <button onClick={this.props.handleDelete}>Delete</button>
      </div>
    )
  }
});
