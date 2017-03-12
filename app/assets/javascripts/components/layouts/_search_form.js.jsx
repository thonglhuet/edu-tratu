var Search = React.createClass({
  getInitialState: function(){
    let categories = this.props.categories;
    return {
      selectValue: '',
      selectIdValue: categories.length > 0 ? categories[0].id : null,
      categories: $.map(categories, function (value,index) { return value; }),
      searchValue: '',
      words: [],
      didFetchData: false
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
    this.fetchDataDone(e.target.value)
  },
  fetchDataDone: function(search){
    $.ajax({
      url: '/searchs',
      dataType: 'json',
      data:{q: search, category_id: this.state.selectIdValue},
      success: function(data){
      this.setState({
        words: data,
        didFetchData: true
      })
      }.bind(this),
      error: function(xhr, status, err){
        console.error('/searchs', status, err.toString());
      }
    })
  },
  handleOnSubmit: function(e){
    e.preventDefault()
    this.fetchDataDone(this.state.searchValue)
  },
  makeCategorySelection: function(category){
    return <option key={category.id} value={category.id}>{category.name}</option>
  },
  render: function(){
    return(
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 col-xs-12 box-search'>
            <form onSubmit={this.handleOnSubmit}>
              <div className='input-group'>
                <div className='input-group-btn search-panel' id='search-panel'>
                  <select className='form-control dropdown-toggle search-btn'
                    defaultValue={this.state.selectValue} role='menu' onChange={this.handleChangeValue}>
                      {this.state.categories.map(this.makeCategorySelection)}
                  </select>
                </div>
                <input type='text' className='form-control search-btn' ref='search' onChange={this.handleChange}
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
        <div className='row'>
          <div className='col-md-8 col-xs-12 words-list'>
            {this.state.didFetchData ? <Words words={this.state.words}/> : null}
          </div>
        </div>
      </div>
    )
  }
})
