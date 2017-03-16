var SearchBar = React.createClass({
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." value={this.props.filterText} />
      </form>
    );
  }
});
