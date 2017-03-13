var CategoriesContainer = React.createClass({
  getInitialState: function(){
    return {
      categories: this.props.categories,
    }
  },
  parentCategorySubmit: function(formData, onSuccess, onError){
    $.ajax({
      url: '/categories',
      dataType: 'json',
      type: 'POST',
      data: formData,
      success: function(categories) {
        this.setState({categories: categories});
        onSuccess();
      }.bind(this),
      error: function(response, status, err) {
        onError(response.responseJSON)
      }
    });
  },
  parentUpdateCategory: function(formData, onSuccess, onError){
    $.ajax({
      url: ('/categories/' + formData['category']['id']),
      dataType: 'json',
      type: 'PATCH',
      data: formData,
      success: function(categories) {
        this.setState({categories: categories, showNewForm: false});
        onSuccess();
      }.bind(this),
      error: function(response, status, err) {
        onError(response.responseJSON)
      }
    });
  },
  parentDeleteCategory: function(formData){
    $.ajax({
      url: ('/categories/' + formData['id']),
      dataType: 'json',
      type: 'DELETE',
      data: {},
      success: function(categories) {
        this.setState({categories: categories, showNewForm: false});
      }.bind(this),
      error: function(response, status, err) {
        alert('Cannot delete category');
      }
    });
  },
  render: function() {
    return(
      <div>
        <h1> Category List </h1>
        <CategoryTable
          categories={this.state.categories}
          parentUpdateCategory={this.parentUpdateCategory}
          parentDeleteCategory={this.parentDeleteCategory} />
        <NewCategoryForm
          parentCategorySubmit={this.parentCategorySubmit}
          categories={this.state.categories} />
      </div>
    );
  }
});
