class Organizations extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      organizations: this.props.organizations
    }
    this._handleDelete = this._handleDelete.bind(this)
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
  render(){
    let organizationNote =this.state.organizations.map((organization,index) =>
      <Organization data={organization} key={index} index={index + 1}  handleDelete={this._handleDelete} />
    )
    return(
      <div className='organizations-container'>
        <div className='row'>
          <h3>All Organizations</h3>
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
          </div>
        </div>
      </div>
    )
  }
}
