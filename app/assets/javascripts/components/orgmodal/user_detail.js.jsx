var UserDetail = React.createClass({
  getInitialState: function() {
    return {
      organization_id: this.props.organizations.length &&
        this.props.organizations.length > 0 ?
        this.props.organizations[0].id : null
    };
  },
  makeOrganizationSelection: function(org) {
    return <option value={org.id} key={org.id}>{org.name}</option>;
  },
  handleOrganizationChange: function(e) {
    this.setState({organization_id: e.target.value});
  },
  render: function() {
    let orgField = [
      <div className='row'>
        <div className='col-md-9'>
          <label>Organization<span className='require'>*</span></label>,
          <select className="form-control" name="organization[organization_id]"
            value={this.state.organization_id} onChange={this.handleOrganizationChange}>
              {this.props.organizations.map(this.makeOrganizationSelection)}
          </select>
        </div>
      </div>,
      <div className='row'>
        <div className='col-sm-2'>
          <button type='button' className='btn btn-primary'>Send</button>
        </div>
      </div>]
    return (
      <div>
        <div className='row'>
          <div className='col-md-9'>{this.props.name}</div>
        </div>
        <div className='row'>
          <div className='col-md-9'>{this.props.email}</div>
        </div>
        {this.props.organizations.length > 0 ? orgField : null}
      </div>
    );
  }
})
