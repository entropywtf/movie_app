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
      movie.description} /> : <h5>{this.props.movie.description}</h5>;
    var signed_in = this.props.signed_in;
    return (
      <div>
        {title}
        {description}
        {this.props.signed_in &&
          <div className="btn-group">
            <button type="button" className="btn btn-default" onClick={this.handleEdit}> {this.state.editable ?
              <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span> :
              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>} </button>
            <button type="button" className="btn btn-danger" onClick={this.props.handleDelete}>
              <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>
          </div>
        }
      </div>
    )
  }
});
