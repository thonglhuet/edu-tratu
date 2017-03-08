var DictionaryForm = React.createClass({
  getInitialState: function() {
    let categories = this.props.categories;
    return {
      category_id: categories.length > 0 ? categories[0].id : null,
      name: '',
      description: ''
    }
  },
  handleChange: function(e) {
    var name = e.target.name;
    var obj = {};
    obj[name] = e.target.value;
    this.setState(obj);
  },
  valid: function() {
    return (this.state.category_id && this.state.name && this.state.description);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    $.post('/dictionaries',
      { dictionary: this.state },
      function(data) {
        this.props.handleFormSubmit(data);
        this.setState(this.getInitialState());
      }.bind(this),
      'JSON'
    );
  },
  makeCategorySelection: function(category) {
    return <option value={category.id}>{category.name}</option>;
  },
  render: function() {
    return (
      <form className='form-inline' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <select className='form-control' name='category_id'
          onChange={this.handleChange}>
            {this.props.categories.map(this.makeCategorySelection)}
          </select>
        </div>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Name'
            name='name' value={this.state.name} onChange={this.handleChange}>
          </input>
        </div>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Description'
            name='description' value={this.state.description} onChange={this.handleChange}>
          </input>
        </div>
        <div className='form-group'>
          <input type='submit' className='btn btn-primary' disabled={!this.valid()}>
          </input>
        </div>
      </form>
    );
  }
});
