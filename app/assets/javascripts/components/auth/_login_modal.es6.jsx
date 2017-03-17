class Login extends React.Component {
  constructor(){
    super()
    this._handleInputChange = this._handleInputChange.bind(this)
    this._handleSignInClick = this._handleSignInClick.bind(this)
    this.state = {
      email: '',
      password: '',
      login_false: false
    }
  }
  componentDidMount(){
     $(ReactDOM.findDOMNode(this)).modal('show');
     $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
  }
  _handleInputChange(e){
    let name = e.target.name
    let obj = {}
    obj[name] = e.target.value
    this.setState(obj)
  }
  _handleSignInClick(e){
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/users/sign_in',
      dataType: 'json',
      data: {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      },
      success: function(data){
       location.reload();
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({login_false: true})
      }.bind(this)
    })
  }
  render(){
    let _error_login = (
      <div className='alert alert-warning'>
        Login fail!
      </div>
    )
    return (
      <div className='modal fade'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
              <h3>Login</h3>
            </div>
            <div className='modal-body'>
              {this.state.login_false ? _error_login : null}
              <form>
                <div className='form-group'>
                  <label>Email <span className='require'>*</span></label>
                  <input name='email' type='email' placeholder='email' value={this.state.email}
                    onChange={this._handleInputChange}  className='form-control'/>
                </div>
                <div className='form-group'>
                  <label>Password <span className='require'>*</span></label>
                  <input name='password' type='password' placeholder='password' value={this.state.password}
                    onChange={this._handleInputChange}  className='form-control'/>
                </div>
                <div className='form-group'>
                  <input type='submit' onClick={this._handleSignInClick} defaultValue='login'
                    className='btn btn-primary' />
                  <a href='/users/sign_up' className='login-btn-register'>or Sign up</a>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
