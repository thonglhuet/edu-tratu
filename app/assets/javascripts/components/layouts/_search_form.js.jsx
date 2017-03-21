var Search = React.createClass({
  getInitialState: function(){
    let categories = this.props.categories;
    return {
      selectValue: '',
      selectIdValue: categories.length > 0 ? categories[0].id : null,
      categories: $.map(categories, function (value,index) { return value; }),
      searchValue: '',
      words: [],
      didFetchData: false,
      showModal: false,
      signedIn: this.props.signedIn
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
        this.setState({didFetchData: true})
      }.bind(this)
    })
  },
  handleOnSubmit: function(e){
    e.preventDefault()
    this.fetchDataDone(this.state.searchValue)
  },
  makeCategorySelection: function(category){
    return <option key={category.id} value={category.id}>{category.name}</option>
  },
  handleHideModal: function(){
    this.setState({
      showModal: false
    });
  },
  handleShowModal: function(){
    this.setState({
      showModal: true,
    });
  },
  onClick: function(e){
    e.preventDefault()
    this.setState({
      showModal: true,
    });
  },
  render: function(){
    return(
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 col-md-offset-2 col-xs-12 box-search'>
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
        </div>
        <div className='row'>
          <div className='col-md-8 col-md-offset-2 col-xs-12 words-list'>
            {
              this.state.didFetchData ? <Words words={this.state.words} /> : null
            }
          </div>
        </div>
        {this.state.showModal ? <Register handleHideModal={this.handleHideModal} /> : null}
      </div>
    )
  }
})
