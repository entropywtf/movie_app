var FilterableOrdersComponent = React.createClass({
  getInitialState() {
    return {
      orders: this.props.categories
    }
  },
  _onFilterSelected(filters) {
    var filtersArray = filters == null || filters == '' ? this.props.filters : filters.split(','),
  filteredOrders = this.props.categories.filter((index, element) => filtersArray.indexOf(index.status) != -1);

  this.setState({
  });
},
render() {
  return (
    <div>
      <FilteredSearchComponent filters={this.props.filters} onFilterSelected={this._onFilterSelected}
        orders={this.state.orders}/>
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
    //http://bit.ly/2bxBzEb
    this.setState({
      filters: filterValue
    }, function afterFilterStateUpdate() {
      this.props.onFilterSelected(this.state.filters);
      this.props.handleFilter(filterValue);
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
      onChange={this.onChange.bind(this)}
      multi={true}
      simpleValue={true}
      value={this.state.filters}
      />
      )
  }
});
