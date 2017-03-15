class AddOrganization extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: '',
      description: '',
      success: false,
      success_update: false,
      formErrors: {},
      edit: this.props.edit,
      organization_id: this.props.organization_id
    }
    this._handleAdd = this._handleAdd.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this.__fieldErrors = this._fieldErrors.bind(this)
    this._handleValidationError = this._handleValidationError.bind(this)
    this._handleSuccess = this._handleSuccess.bind(this)
    this._handleFetchData = this._handleFetchData.bind(this)
    this._handleUpdate = this._handleUpdate.bind(this)
    this._handleSuccessUpdate = this._handleSuccessUpdate.bind(this)
  }
  componentDidMount(){
     $(ReactDOM.findDOMNode(this)).modal('show')
     $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props._handleHideModal)
     if(this.props.organization_id && this.props.edit){
       this._handleFetchData(this.props.organization_id)
     }
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
      success: false,
      success_update: false
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
  _handleSuccessUpdate(){
    this.setState({
      success: false,
      formErrors: {},
      name: '',
      description: '',
      success_update: true,
      edit: this.props.edit,
      organization_id: this.props.organization_id
    })
    this._handleFetchData(this.props.organization_id)
  }
  _handleAdd(e){
    e.preventDefault()
    this.props._handleAdd(
      {organization: {name: this.state.name, description: this.state.description}},
      this._handleSuccess,
      this._handleValidationError
    )
  }
  _handleFetchData(id){
     $.ajax({
      method: 'GET',
      url: '/organizations/' + id + '/edit/',
      dataType: 'json',
      success: function(data){
       this.setState({
         name: data.name,
         description: data.description,
         organization_id: data.id
       })
      }.bind(this),
      error: function(response, status, err){
        onError(response.responseJSON)
      }
    })
  }
   _handleSuccess(){
    this.setState({
      success: true,
      formErrors: {},
      name: '',
      description: '',
      success_update: false
    })
  }
  _handleUpdate(e){
    e.preventDefault()
    this.props._handleUpdateSubmit(
      {organization: {name: this.state.name, description: this.state.description}},
      this.state.organization_id,
      this._handleSuccessUpdate,
      this._handleValidationError
    )
  }
  render(){
    let _fieldSuccess = (
      <div className='alert alert-success'>
          Create organization success!
      </div>
    )
    let _fieldSuccessUpdate = (
      <div className='alert alert-success'>
          Update organization success!
      </div>
    )
    let formGroupClass = this.state.formErrors["name"] ? "form-group has-error" : "form-group"
    let inputHidden = (
      <input type='hidden' name='id' value={this.state.organization_id} />
    )
    return (
      <div className='modal fade'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
              <h3>{this.state.edit ?  'Update Organization' : 'Add Organization'}</h3>
            </div>
            <div className='modal-body'>
              {this.state.success ? _fieldSuccess : null}
              {this.state.success_update ? _fieldSuccessUpdate : null}
              <form>
                {this.state.organization_id ? inputHidden : null}
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
                  <input type='submit' onClick={this.state.edit ? this._handleUpdate : this._handleAdd}
                    defaultValue={this.state.edit ?  'Update Organization' : 'Add Organization'}
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
