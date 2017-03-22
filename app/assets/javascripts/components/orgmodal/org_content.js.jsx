var Content = React.createClass({
  render: function(){
    return(
      <div>
        {this.props.currentTab === 1 ? <UserTab /> : null}
        {this.props.currentTab === 2 ? <div>Tab 2</div> : null}
      </div>
    );
  }
});
