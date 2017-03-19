var Main = React.createClass({
  render() {
    return (
      <div className="container">
        <Body signed_in={this.props.signed_in} />
      </div>
    )
  }
});
