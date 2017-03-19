var AllCategories = React.createClass({
  handleCategoryFilter(category) {
    this.props.handleCategoryFilter(category);
  },
  render() {
    var categories = this.props.categories.map((category) => {
      return (
        <div key={category.id}>
          <Category category={category}
            handleCategoryFilter={this.handleCategoryFilter.bind(this, category)}/>
        </div>
      )
    });

    return(
      <div id="all_categories_component">
        {categories}
      </div>
    )
  }
});
