var FilterableOrdersComponent = React.createClass({
  getInitialState() {
    return {
      orders: this.props.categories
    }
  },
  _onFilterSelected(filters) {
    var filtersArray = filters == null || filters == '' ? this.props.filters : filters.split(','),
    filteredOrders = this.props.categories.filter((index, element) => filtersArray.indexOf(index.status) != -1);
  },
  render() {
    return (
      <div>
        <FilteredSearchComponent filters={this.props.filters} onFilterSelected={this._onFilterSelected}
          orders={this.state.orders} handleFilter={this.props.handleFilter}/>
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
  var options = this.props.orders.map(function(order) {
    return { value: order.name, label: order.name }
  });
    return (
      <Select
      name="form-field-name"
      options={options}
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
