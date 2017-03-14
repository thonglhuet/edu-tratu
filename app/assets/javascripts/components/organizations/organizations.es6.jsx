class Organizations extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      organizations: this.props.organizations,
      showModal: false
    }
    this._handleDelete = this._handleDelete.bind(this)
    this._handleAdd = this._handleAdd.bind(this)
    this._handleHideModal = this._handleHideModal.bind(this)
    this._handleShowModal = this._handleShowModal.bind(this)
  }
  _handleDelete(id){
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this organization?",
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: false,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ec6c62"
    },function () {
      $.ajax({
        method: 'DELETE',
        url: "/organizations/" + id,
        dataType: 'json',
        success: function(data){
          this.setState({organizations: data})
        swal("Deleted!", "Your Organizations was successfully deleted!", "success")
        }.bind(this),
        error: function(xhr, status, err){
          swal("Oops", "We couldn't connect to the server!", "error")
        }
      })
    }.bind(this))
  }
  _handleHideModal(){
    this.setState({
      showModal: false
    })
  }
  _handleShowModal(){
    this.setState({
      showModal: true
    })
  }
  _handleAdd(formData,onSuccess,onError){
    $.ajax({
      method: 'POST',
      url: '/organizations',
      dataType: 'json',
      data: formData,
      success: function(data){
       this.setState({
        organizations: data
       })
       onSuccess()
      }.bind(this),
      error: function(response, status, err){
        onError(response.responseJSON)
      }
    })
  }
  render(){
    let organizationNote =this.state.organizations.map((organization,index) =>
      <Organization data={organization} key={index} index={index + 1}  handleDelete={this._handleDelete} />
    )
    return(
      <div className='organizations-container'>
        <div className='row'>
          <h3>All Organizations</h3>
        </div>
        <div className='row organizations-action'>
          <div className='col-md-2 pull-right'>
            <a href="#" className='btn btn-primary pull-right' onClick={this._handleShowModal}>Add organization</a>
          </div>
        </div>
        <div className='row'>
          <div className='table-responsive'>
            <table  className='table table-hover table-bordered'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Date create</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {organizationNote}
              </tbody>
            </table>
            {
          this.state.showModal ? <AddOrganization
          _handleAdd={this._handleAdd}
          _handleHideModal={this._handleHideModal} /> : null
        }
          </div>
        </div>
      </div>
    )
  }
}
