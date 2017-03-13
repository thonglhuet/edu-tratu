var NewCategoryForm = React.createClass({
  getInitialState: function(){
    return {
      name: '',
      description: '',
      formErrors: {}
    };
  },
  resetState: function(){
    this.setState({name: "", description: "", formErrors: {}});
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
      <div className='row'>
        <div className='col-sm-4'>
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
        </div>
      </div>
    );
  },
  renderCategoryDescriptionField: function(){
    var formGroupClass = this.state.formErrors["description"] ? "form-group has-error" : "form-group"
    return(
      <div className='row'>
        <div className='col-sm-4'>
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
        </div>
      </div>
    );
  },
  render: function() {
    return(
      <div>
        <h4 className='form_header'> Create New Category </h4>
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
    );
  }
});
