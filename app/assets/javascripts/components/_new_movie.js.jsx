var NewMovie = React.createClass({
  getInitialState() {
    return { cats: '' }
  },
  handleClick() {
    var title = this.refs.title.value;
    var description = this.refs.description.value;
    var selected_categories = this.state.cats;
    $.ajax({
      url: '/api/v1/movies',
      type: 'POST',
      data: { movie: { title: title, description: description,
        selected_categories: selected_categories } },
      success: (movie) => {
        this.props.handleSubmit(movie);
      }
    })
  },
  handleFilter(val) {
    this.setState({ cats: val });
  },
  render() {
    var filters = this.props.categories.map(function(cat) {
      return cat.name;
    });
    return (
      <div id="new_movie">
        <input type="text" className="form-control input_title" ref='title'
          placeholder='Enter the title of the movie' />
        <input type="text" className="form-control input_desc" ref='description'
          placeholder='Enter a descriprion' />
         <div className="js-app"></div>
        {this.props.categories.length !== 0 &&
        <FilterableOrdersComponent filters={filters} categories={this.props.categories}
          handleFilter={this.handleFilter}/> }
        <button type="button" className="btn btn-success" onClick={this.handleClick}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
      </div>
    )
  }
});
