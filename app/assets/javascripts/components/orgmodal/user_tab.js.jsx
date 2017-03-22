var UserTab = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      users: [],
      organizations: []
    };
  },
  componentWillMount: function() {
    $.ajax({
      url: '/api/organizations',
      dataType: 'json',
      type: 'GET',
      data: {},
      success: function(organizations) {
        this.setState({organizations: organizations});
      }.bind(this),
      error: function(response, status, err) {
        swal("Oops", "Connection errors", "error");
      }
    });
  },
  handleFilterTextInputChange(e) {
    this.setState({filterText: e.target.value});
    $.ajax({
      url: '/api/users',
      dataType: 'json',
      type: 'GET',
      data: {q: e.target.value},
      success: function(users) {
        this.setState({users: users});
      }.bind(this),
      error: function(response, status, err) {
        // swal("Oops", "We couldn't get the users you want", "error");
      }
    });
  },
  renderSearchBar: function() {
    return (
      <form>
        <input
          className="form-control"
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  },
  renderUsers: function() {
    return (
      this.state.users.map(function(user, index){
        return(
          <UserDetail
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            organizations={this.state.organizations}
          />
        );
      }.bind(this))
    );
  },
  render: function() {
    return(
      <div>
        <div className='row'>
          <div className='col-md-5 pull-left'>
            {this.renderSearchBar()}
          </div>
        </div>
        {this.renderUsers()}
      </div>
    );
  }
});
