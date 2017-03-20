var SideRating = React.createClass({
  getInitialState: function(){
    return {rating: this.props.rating.id, hoverAt: null};
  },
  render: function(){
    var stars = [];
      for(var i = 0 ; i < 5; i++){
        var rating = this.state.hoverAt != null ? this.state.hoverAt : this.state.rating;
        var selected = (i < rating);
        stars.push(<Star key={i} selected={selected} />);
      }
      var msize = this.props.rating.movies.length;
      return (<div onClick={this.props.handleRatingFilter} id="side_rating_component">
        {stars} ({msize})
      </div>);
    }
});


