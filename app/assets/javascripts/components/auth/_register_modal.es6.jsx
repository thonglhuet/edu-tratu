class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      name: '',
      register_false: false
    }
    this._handleInputChange = this._handleInputChange.bind(this)
    this._handleSignUpClick = this._handleSignUpClick.bind(this)
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
   _handleSignUpClick(e){
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/users',
      data: {
        user: {
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
          name: this.state.name
        }
      },
      success: function(data){
       location.reload();
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({register_false: true})
      }.bind(this)
    })
  }
   render(){
    let errorRegisterNote = (
        <div className='alert alert-warning'>
          Register fail!
        </div>
     )
    return (
      <div className='modal fade'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
              <h3>Register</h3>
            </div>
            <div className='modal-body'>
               {this.state.register_false ? errorRegisterNote : null}
              <form>
                <div className='form-group'>
                  <input name='name' type='text' placeholder='name' value={this.state.name}
                    onChange={this._handleInputChange}  className='form-control'/>
                </div>
                <div className='form-group'>
                  <input name='email' type='email' placeholder='email' value={this.state.email}
                    onChange={this._handleInputChange}  className='form-control'/>
                </div>
                <div className='form-group'>
                  <input name='password' type='password' placeholder='password' value={this.state.password}
                    onChange={this._handleInputChange}  className='form-control'/>
                </div>
                <div className='form-group'>
                  <input name='password_confirmation' type='password' placeholder='password_confirmation'
                    value={this.state.password_confirmation}
                    onChange={this._handleInputChange}  className='form-control'/>
                </div>
                <div className='form-group'>
                  <input type='submit' onClick={this._handleSignUpClick} defaultValue='Register'
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
