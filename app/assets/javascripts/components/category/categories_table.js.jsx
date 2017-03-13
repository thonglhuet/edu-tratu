var CategoryTable = React.createClass({
  renderCategoryRows: function(){
    return (
      this.props.categories.map(function(category){
        return(
          <CategoryRow
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
            parentUpdateCategory={this.props.parentUpdateCategory}
            parentDeleteCategory={this.props.parentDeleteCategory} />
        );
      }.bind(this))
    );
  },
  render: function() {
    return(
      <div>
        <div className="row dic_head">
          <div className="col-sm-2">
          </div>
          <div className="col-sm-2 dic_head_text">
            Name
          </div>
          <div className="col-sm-4 dic_head_text">
            Description
          </div>
        </div>
        {this.renderCategoryRows()}
      </div>
    );
  }
});
