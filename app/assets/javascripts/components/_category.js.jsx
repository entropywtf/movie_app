var Category = React.createClass({
  render() {
    var msize = this.props.category.movies.length;
    var name = this.props.category.name;
    return (
      <div onClick={this.props.handleCategoryFilter} id="category_component">
        {name} ({msize})
      </div>
    )
  }
});
