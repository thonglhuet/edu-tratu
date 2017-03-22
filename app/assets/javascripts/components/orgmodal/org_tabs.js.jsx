var Tabs = React.createClass({
  handleClick: function(tab){
    this.props.changeTab(tab);
  },

  render: function(){
    return (
      <div className='container'>
        <ul className='nav nav-tabs'>
        {this.props.tabList.map(function(tab) {
          return (
            <Tab
              handleClick={this.handleClick.bind(this, tab)}
              key={tab.id}
              title={tab.title}
              isCurrent={(this.props.currentTab === tab.id)}
            />
          );
        }.bind(this))}
        </ul>
      </div>
    );
  }
});
