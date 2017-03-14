class AddOrganization extends React.Component{
  constructor(){
    super()
    this.state = {
      name: '',
      description: '',
      success: false,
      formErrors: {}
    }
    this._handleAdd = this._handleAdd.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this.__fieldErrors = this._fieldErrors.bind(this)
    this._handleValidationError = this._handleValidationError.bind(this)
    this._handleSuccess = this._handleSuccess.bind(this)
  }
  componentDidMount(){
     $(ReactDOM.findDOMNode(this)).modal('show');
     $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props._handleHideModal);
  }
  _handleInputChange(e){
    let name = e.target.name
    let obj = {}
    obj[name] = e.target.value
    this.setState(obj)
  }
  _handleValidationError(formErrorObj){
    this.setState({
      formErrors: formErrorObj,
      success: false
    })
  }
  _fieldErrors(attribute){
    if(this.state.formErrors[attribute]){
      return(
        this.state.formErrors[attribute].map(function(error, i){
          return(
            <span key={i} className="error">
              {error}
            </span>
          );
        })
      );
    } else{
      return "";
    }
  }
  _handleSuccess(){
    this.setState({
      success: true,
      formErrors: {},
      name: '',
      description: ''
    })
  }
  _handleAdd(e){
    e.preventDefault()
    this.props._handleAdd(
      {organization: {name: this.state.name, description: this.state.description}},
      this._handleSuccess,
      this._handleValidationError
    )
  }
  render(){
    let _fieldSuccess = (
      <div className='alert alert-success'>
          Create organization success!
      </div>
    )
    let formGroupClass = this.state.formErrors["name"] ? "form-group has-error" : "form-group"
    return (
      <div className='modal fade'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
              <h3>Add Organization</h3>
            </div>
            <div className='modal-body'>
              {this.state.success ? _fieldSuccess : null}
              <form>
                <div className={formGroupClass}>
                  <input name='name' type='text' placeholder='name' value={this.state.name}
                    onChange={this._handleInputChange}  className='form-control'/>
                  {this._fieldErrors("name")}
                </div>
                <div className='form-group'>
                  <textarea name='description' className="form-control" rows="5"
                    value={this.state.description} onChange={this._handleInputChange} >
                  </textarea>
                </div>
                <div className='form-group'>
                  <input type='submit' onClick={this._handleAdd} defaultValue='Add Organization'
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
