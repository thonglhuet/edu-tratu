class Login extends React.Component {
  constructor(){
    super()
    this._handleInputChange = this._handleInputChange.bind(this)
    this._handleSignInClick = this._handleSignInClick.bind(this)
    this.state = {
      email: '',
      password: ''
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
        console.error('/users/sign_in', status, err.toString());
      }
    })
  }
  render(){
    return (
      <div className='modal fade'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
              <h3>Login</h3>
            </div>
            <div className='modal-body'>
              <form>
                <div className='form-group'>
                  <input name='email' type='email' placeholder='email' value={this.state.email}
                    onChange={this._handleInputChange}  className='form-control'/>
                </div>
                <div className='form-group'>
                  <input name='password' type='password' placeholder='email' value={this.state.password}
                    onChange={this._handleInputChange}  className='form-control'/>
                </div>
                <div className='form-group'>
                  <input type='submit' onClick={this._handleSignInClick} defaultValue='login'
                    className='btn btn-primary' />
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
