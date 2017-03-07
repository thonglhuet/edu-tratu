var Search = React.createClass({
  getInitialState: function(){
    return {
      selectValue: '',
      selectIdValue: ''
    }
  },
  handleChangeValue: function(e){
    this.setState({
      selectValue: e.target.text,
      selectIdValue: e.target.value
    })
    console.log(this.state.selectIdValue)
  },
  handleGetValue: function(e){
    this.replaceState({
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
            <div className='input-group'>
              <div className='input-group-btn search-panel' id='search-panel'>
                <select className='btn btn-default dropdown-toggle search-btn'
                  defaultValue={this.state.selectValue} role='menu' onChange={this.handleChangeValue}>
                  <option value='1'>English</option>
                  <option value='2'>English-VietNam</option>
                </select>
              </div>
              <input type='hidden' name='search_param' value='all' id='search_param' />
              <input type='text' className='form-control search-btn' name='x' placeholder='Search term...' />
              <span className='input-group-btn'>
                <button className='btn btn-default search-btn' type='button'>
                  <span className='glyphicon glyphicon-search'></span>
                </button>
              </span>
            </div>
            <div className='category-list'>
              <ul>
                <li><a className='btn' value='1' onClick={this.handleGetValue}>English</a></li>
                <li><a className='btn' value='2' onClick={this.handleGetValue}>English-VietNam</a></li>
              </ul>
            </div>
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
