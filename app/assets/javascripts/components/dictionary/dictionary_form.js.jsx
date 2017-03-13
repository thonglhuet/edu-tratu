var NewDictionaryForm = React.createClass({
  getInitialState: function(){
    return {
      category_id: this.props.categories.length > 0 ? this.props.categories[0].id : null,
      name: '',
      description: '',
      is_new_category: false,
      category_name: '',
      category_description: '',
      formErrors: {}
    };
  },
  resetState: function(){
    this.setState({category_id: this.props.categories[0].id, name: "", description: "",
      is_new_category: false, category_name: '', category_description: '', formErrors: {}});
  },
  handleValidationError: function(formErrorObj){
    this.setState({formErrors: formErrorObj});
  },
  newDictionarySubmit: function(e){
    e.preventDefault();
    if (this.state.is_new_category) {
      var formData = {category: {name: this.state.category_name,
        description: this.state.category_description,
        dictionaries_attributes: [{name: this.state.name,
        description: this.state.description}]}};
      var url = '/categories';
    } else {
      var formData = {dictionary: {category_id: this.state.category_id, name: this.state.name,
        description: this.state.description}}
      var url = '/dictionaries';
    }
    this.props.parentDictionarySubmit(
      url,
      formData,
      this.resetState,
      this.handleValidationError
    );
  },
  handleNewCategory: function(e){
    this.setState({is_new_category: !this.state.is_new_category})
  },
  handleCategoryChange: function(e) {
    this.setState({category_id: e.target.value});
  },
  handleCategoryNameChange: function(e) {
    this.setState({category_name: e.target.value});
  },
  handleCategoryDescriptionChange: function(e) {
    this.setState({category_description: e.target.value});
  },
  handleNameChange: function(e){
    this.setState({name: e.target.value});
  },
  handleDescriptionChange: function(e){
    this.setState({description: e.target.value});
  },
  renderFieldErrors: function(attribute, isDictionary){
    if (isDictionary) {
      if (this.state.formErrors["dictionaries." + attribute]) {
        return(
        this.state.formErrors["dictionaries." + attribute].map(function(error, i){
          return(
            <span key={i} className="help-block">
              {error}
            </span>
          );
        })
      );
      } else {
        return "";
      }
    } else if (this.state.formErrors[attribute]){
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
    let category_link = null
    let category_type = null
    if (this.state.is_new_category) {
      category_link = <a className='btn btn-sm btn-danger' onClick={this.handleNewCategory}>
                        Close?
                      </a>
      var formGroupClass = this.state.formErrors["name"] ?
        "form-group has-error" : "form-group";
      category_type = <input
                        name="category[name]"
                        type="string"
                        placeholder="Category Name"
                        value={this.state.category_name}
                        onChange={this.handleCategoryNameChange}
                        className="string form-control"
                      />
    } else {
      category_link = <a className='btn btn-sm btn-primary' onClick={this.handleNewCategory}>
                        New Category
                      </a>
      category_type = <select className="form-control" name="dictionary[category_id]"
                        onChange={this.handleCategoryChange}>
                          {this.props.categories.map(this.makeCategorySelection)}
                      </select>
      var formGroupClass = "form-group";
    }
    return(
      <div className='row'>
        <div className='col-sm-4'>
          <div className= {formGroupClass}>
            {category_type}
            {this.renderFieldErrors("name", false)}
          </div>
        </div>
        <div className='col-sm-2'>
          {category_link}
        </div>
      </div>
    );
  },
  renderCategoryDescriptionField: function(){
    if (this.state.is_new_category) {
      var formGroupClass = this.state.formErrors["description"] ?
        "form-group has-error" : "form-group"
      return(
        <div className='row'>
           <div className='col-sm-4'>
             <div className= {formGroupClass}>
               <input
                 name="category[description]"
                 type="string"
                 placeholder="Category Description"
                 value={this.state.category_description}
                 onChange={this.handleCategoryDescriptionChange}
                 className="string form-control" />
               {this.renderFieldErrors("description", false)}
             </div>
           </div>
        </div>
      );
    } else {
      return("");
    }
  },
  renderDictionaryNameField: function(){
    var formGroupClass = this.state.formErrors["dictionaries.name"] ?
      "form-group has-error" : "form-group";
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
            {this.renderFieldErrors("name", true)}
          </div>
        </div>
      </div>
    );
  },
  renderDictionaryDescriptionField: function(){
    var formGroupClass = this.state.formErrors["dictionaries.description"] ?
      "form-group has-error" : "form-group";
    return(
      <div className='row'>
        <div className='col-sm-4'>
          <div className={formGroupClass}>
            <textarea
              name="dictionary[description]"
              placeholder="Dictionary Description"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
              className="text form-control"
            />
            {this.renderFieldErrors("description", true)}
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
            {this.renderCategoryDescriptionField()}
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
