var tabList = [
  { 'id': 1, 'title': 'User Search' },
  { 'id': 2, 'title': 'Organization Search'}
];

var OrgModal = React.createClass({
  getInitialState: function () {
    return {
      tabList: tabList,
      currentTab: 1
    };
  },
  componentDidMount(){
     $(ReactDOM.findDOMNode(this)).modal('show');
     $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
  },
  changeTab: function(tab) {
    this.setState({ currentTab: tab.id });
  },
  render() {
    return (
      <div className='modal fade'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'
                aria-label='Close'><span aria-hidden='true'>&times;</span>
              </button>
              <h3>Organization</h3>
            </div>
            <div className='modal-body'>
              <Tabs
                currentTab={this.state.currentTab}
                tabList={this.state.tabList}
                changeTab={this.changeTab}
              />
              <Content currentTab={this.state.currentTab} />
             </div>
            <div className='modal-footer'>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
