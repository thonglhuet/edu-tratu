var NewDictionaryForm = React.createClass({
  getInitialState: function(){
    return {
      category_id: this.props.categories.length > 0 ? this.props.categories[0].id : null,
      name: '',
      description: '',
      formErrors: {}
    };
  },
  resetState: function(){
    this.setState({category_id: this.props.categories[0].id, name: "", description: "", formErrors: {}});
  },
  handleValidationError: function(formErrorObj){
    this.setState({formErrors: formErrorObj});
  },
  newDictionarySubmit: function(e){
    e.preventDefault();
    this.props.parentDictionarySubmit(
      {dictionary: {category_id: this.state.category_id, name: this.state.name,
        description: this.state.description}},
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
  makeCategorySelection: function(category) {
    if (this.state.category_id == category.id) {
      return <option value={category.id} selected>{category.name}</option>;
    } else {
      return <option value={category.id}>{category.name}</option>;
    }
  },
  renderDictionaryCategoryFields: function(){
    return(
      <div className='row'>
        <div className='col-sm-4'>
          <div className= {"form-group"}>
            <select className="form-control" name="dictionary[category_id]"
              onChange={this.handleCategoryChange}>
                {this.props.categories.map(this.makeCategorySelection)}
            </select>
          </div>
        </div>
      </div>
    );
  },
  renderDictionaryNameField: function(){
    var formGroupClass = this.state.formErrors["name"] ? "form-group has-error" : "form-group"
    return(
      <div className='row'>
        <div className='col-sm-4'>
          <div className= {formGroupClass}>
            <input
              name="dictionary[name]"
              type="string"
              placeholder="Dictionary Name"
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
  renderDictionaryDescriptionField: function(){
    var formGroupClass = this.state.formErrors["description"] ? "form-group has-error" : "form-group"
    return(
      <div className='row'>
        <div className='col-sm-4'>
          <div className= {formGroupClass}>
            <textarea
              name="dictionary[description]"
              placeholder="Dictionary Description"
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
        <h4 className='form_header'> Create New Dictionary </h4>
        <form className= 'form_body' onSubmit={this.newDictionarySubmit}>
          <div className='form-inputs'/>
            {this.renderDictionaryCategoryFields()}
            {this.renderDictionaryNameField()}
            {this.renderDictionaryDescriptionField()}
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
