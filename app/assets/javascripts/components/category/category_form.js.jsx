var NewCategoryForm = React.createClass({
  getInitialState: function(){
    return {
      name: '',
      description: '',
      success: false,
      formErrors: {}
    };
  },
  componentDidMount(){
     $(ReactDOM.findDOMNode(this)).modal('show');
     $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
  },
  resetState: function(){
    this.setState({name: "", description: "", success: true, formErrors: {}});
  },
  handleValidationError: function(formErrorObj){
    this.setState({formErrors: formErrorObj});
  },
  newCategorySubmit: function(e){
    e.preventDefault();
    this.props.parentCategorySubmit(
      {category: {name: this.state.name, description: this.state.description}},
      this.resetState,
      this.handleValidationError
    );
  },
  handleCategoryChange: function(e) {
    this.setState({category_id: e.target.value});
  },
  handleNameChange: function(e){
    this.setState({name: e.target.value});
  },
  handleDescriptionChange: function(e){
    this.setState({description: e.target.value});
  },
  renderFieldErrors: function(attribute){
    if(this.state.formErrors[attribute]){
      return(
        this.state.formErrors[attribute].map(function(error, i){
          return(
            <span key={i} className="help-block">
              {error}
            </span>
          );
        })
      );
    } else{
      return "";
    }
  },
  renderCategoryNameField: function(){
    var formGroupClass = this.state.formErrors["name"] ? "form-group has-error" : "form-group"
    return(
      <div className= {formGroupClass}>
        <input
          name="category[name]"
          type="string"
          placeholder="Category Name"
          value={this.state.name}
          onChange={this.handleNameChange}
          className="string form-control"
        />
        {this.renderFieldErrors("name")}
      </div>
    );
  },
  renderCategoryDescriptionField: function(){
    var formGroupClass = this.state.formErrors["description"] ? "form-group has-error" : "form-group"
    return(
      <div className= {formGroupClass}>
        <textarea
          name="category[description]"
          placeholder="Category Description"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
          className="text form-control"
        />
        {this.renderFieldErrors("description")}
      </div>
    );
  },
  render: function() {
    let fieldSuccess = (
      <div className='alert alert-success'>
          Create category successfully!
      </div>
    )
    return(
      <div className='modal fade'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
              <h3>Add Category</h3>
            </div>
            <div className='modal-body'>
              {this.state.success ? fieldSuccess : null}
              <form className= 'form_body' onSubmit={this.newCategorySubmit}>
                <div className='form-inputs'/>
                  {this.renderCategoryNameField()}
                  {this.renderCategoryDescriptionField()}
                  <div className='row'>
                    <div className='col-sm-4'>
                      <input type="submit" value="Save" className='btn btn-primary' />
                    </div>
                  </div>
              </form>
            </div>
            <div className='modal-footer'>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
