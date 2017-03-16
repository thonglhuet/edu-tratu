var SearchBar = React.createClass({
  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  },
  render() {
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
  }
});
