var CategoryTable = React.createClass({
  renderCategoryRows: function(){
    return (
      this.props.categories.map(function(category, index){
        return(
          <CategoryRow
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
            index={index}
            parentUpdateCategory={this.props.parentUpdateCategory}
            parentDeleteCategory={this.props.parentDeleteCategory} />
        );
      }.bind(this))
    );
  },
  render: function() {
    return(
      <div className='row'>
        <div className='table-responsive'>
          <table  className='table table-hover table-bordered'>
            <thead className="dic_head">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.renderCategoryRows()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
