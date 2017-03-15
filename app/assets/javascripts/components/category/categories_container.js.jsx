var CategoriesContainer = React.createClass({
  getInitialState: function(){
    return {
      categories: this.props.categories,
      showModal: false
    }
  },
  handleHideModal(){
    this.setState({
      showModal: false
    })
  },
  handleShowModal(){
    this.setState({
      showModal: true
    })
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
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this category?",
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: false,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ec6c62"
    },function () {
      $.ajax({
        url: ('/categories/' + formData['id']),
        dataType: 'json',
        type: 'DELETE',
        data: {},
        success: function(categories) {
          this.setState({categories: categories, showNewForm: false});
          swal("Deleted!", "Your category was successfully deleted!", "success");
        }.bind(this),
        error: function(response, status, err) {
          swal("Oops", "We couldn't delete this category!", "error");
        }
      });
    }.bind(this));
  },
  render: function() {
    return(
      <div>
        <h1> Category List </h1>
        <div className='row categories-action'>
          <div className='col-md-2 pull-right'>
            <a href="#" className='btn btn-primary pull-right' onClick={this.handleShowModal}>Add category</a>
          </div>
        </div>
        <CategoryTable
          categories={this.state.categories}
          parentUpdateCategory={this.parentUpdateCategory}
          parentDeleteCategory={this.parentDeleteCategory} />
          {this.state.showModal ? <NewCategoryForm
          parentCategorySubmit={this.parentCategorySubmit}
          categories={this.state.categories}
          handleHideModal={this.handleHideModal}/> : null}
      </div>
    );
  }
});
