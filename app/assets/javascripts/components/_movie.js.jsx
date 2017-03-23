var Movie = React.createClass({
  getInitialState(){
    return {editable: false, cats: ''}
  },
  handleFilter(val){
    this.setState({ cats: val });
  },
  handleEdit(){
    if(this.state.editable) {
      var title = this.refs.title.value;
      var id = this.props.movie.id;
      var description = this.refs.description.value;
      var movie = {id: id, title: title, description: description,
        selected_categories: this.state.cats};
      this.props.handleUpdate(movie);
    }
    this.setState({editable: !this.state.editable})
  },
  render() {
    if (this.state.editable) {
      var title = <input type='text' className="form-control input_title"
        ref='title' defaultValue={this.props.movie.title} />;
      var description = <input type='text' className="form-control input_desc"
        ref='description' defaultValue={this.props.movie.description} />;
      var categories = <FilterableOrdersComponent filters={this.props.movie.categories_names}
        categories={this.props.categories} handleFilter={this.handleFilter}/>;
    } else {
      var title = <h3>{this.props.movie.title}</h3>;
      var description = <h5>{this.props.movie.description}</h5>;
      var categories = <h5><i>{this.props.movie.categories_names}</i></h5>;
    }
    var signed_in = this.props.signed_in;
    return (
      <div id="movie_component">
        {title}
        {description}
        <div className="js-app"></div>
        {categories}
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
        <Rating movie={this.props.movie} handleRating={this.props.handleRating} signed_in={signed_in}/>
      </div>
    )
  }
});
