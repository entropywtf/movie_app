var FilterableCategoriesComponent = React.createClass({
  getInitialState() {
    return {
      categories: this.props.categories
    }
  },
  _onFilterSelected(filters) {
    var filtersArray = filters == null || filters == '' ? this.props.filters : filters.split(','),
    filteredCategories = this.props.categories.filter((index, element) => filtersArray.indexOf(index.status) != -1);
  },
  render() {
    return (
      <div>
        <FilteredSearchComponent filters={this.props.filters} onFilterSelected={this._onFilterSelected}
          categories={this.state.categories} handleFilter={this.props.handleFilter}
          options={this.props.options}/>
      </div>
    )
  }
});

var FilteredSearchComponent = React.createClass({
  getInitialState() {
    return {
      filters: ''
    };
  },
  onChange(filterValue) {
    this.setState({
      filters: filterValue
    }, function afterFilterStateUpdate() {
      this.props.onFilterSelected(this.state.filters);
      this.props.handleFilter(this.state.filters);
    });
  },
  render() {
    return (
      <Select
      name="form-field-name"
      options={this.props.options}
      placeholder="Select categories..."
      searchable={true}
      onChange={this.onChange}
      multi={true}
      simpleValue={true}
      value={this.state.filters}
      />
      )
  }
});
