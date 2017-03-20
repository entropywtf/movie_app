var AllRatings = React.createClass({
  handleRatingFilter(rating) {
    this.props.handleRatingFilter(rating);
  },
  render() {
    var ratings = this.props.ratings.map((rating) => {
      return (
        <div key={rating.id}>
          <SideRating rating={rating}
            handleRatingFilter={this.handleRatingFilter.bind(this, rating)}/>
        </div>
      )
    });

    return(
      <div id="all_ratings_component">
        {ratings}
      </div>
    )
  }
});
