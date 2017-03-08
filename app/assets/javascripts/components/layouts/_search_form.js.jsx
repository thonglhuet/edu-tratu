var Search = React.createClass({
  getInitialState: function(){
    return {
      selectValue: '',
      selectIdValue: this.props.categories[0].id,
      categories: $.map(this.props.categories, function (value,index) { return value; }),
      searchValue: ''
    }
  },
  handleChangeValue: function(e){
    this.setState({
      selectValue: e.target.text,
      selectIdValue: e.target.value
    })
  },
  handleChange: function(e){
    this.setState({
      searchValue: e.target.value
    });
  },
  handleOnSubmit: function(e){
    e.preventDefault()
    console.log(this.state.searchValue)
    $.ajax({
      url: '/searchs',
      dataType: 'json',
      data:{q: this.state.searchValue, category_id: this.state.selectIdValue},
      success: function(data){
       console.log(data)
      }.bind(this),
      error: function(xhr, status, err){
        console.error('/searchs', status, err.toString());
      }
    })
  },
  makeCategorySelection: function(category){
    return <option key={category.id} value={category.id}>{category.name}</option>
  },
  handleGetValue: function(e){
    this.setState({
      selectValue: e.target.text,
      selectIdValue: e.target.value
    })
    alert(this.state.selectValue)
  },
  render: function(){
    return(
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 col-xs-12 box-search'>
            <form onSubmit={this.handleOnSubmit}>
              <div className='input-group'>
                <div className='input-group-btn search-panel' id='search-panel'>
                  <select className='btn btn-default dropdown-toggle search-btn'
                    defaultValue={this.state.selectValue} role='menu' onChange={this.handleChangeValue}>
                      {this.state.categories.map(this.makeCategorySelection)}
                  </select>
                </div>
                <input type='text' className='form-control search-btn' onChange={this.handleChange}
                  value={this.state.searchValue} placeholder='Search term...' />
                <span className='input-group-btn'>
                  <button className='btn btn-default search-btn' type='submit'>
                    <span className='glyphicon glyphicon-search'></span>
                  </button>
                </span>
              </div>
              <div className='category-list'>
                <ul>
                </ul>
              </div>
            </form>
          </div>
          <div className='col-md-4 col-xs-12'>
            <div className='box-register'>
              <h2>Framgia Dictionary</h2>
              <p>Create and share your own word lists and quizzes for free!</p>
              <a className='btn box-btn-register'><b>Sign up now</b></a>
              <a className='btn box-btn-login'><b>Login</b></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
