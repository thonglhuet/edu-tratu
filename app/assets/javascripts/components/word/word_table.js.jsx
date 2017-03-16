var WordTable = React.createClass({
  renderWordRows: function(){
    var rows = []
    var index = 0;
    this.props.words.forEach(function(word){
      if (this.props.filterText == '' ||
        LCS(word.content, this.props.filterText).length == this.props.filterText.length) {
        index++;
        rows.push(<WordRow
          key={word.id}
          id={word.id}
          content={word.content}
          meaning={word.meaning}
          index={index}
          parentUpdateWord={this.props.parentUpdateWord}
          parentDeleteWord={this.props.parentDeleteWord} />);
      }
    }.bind(this));
    return (rows);
  },
  render: function() {
    return(
      <div className='row'>
        <div className='table-responsive'>
          <table  className='table table-hover table-bordered'>
            <thead className="dic_head">
              <tr>
                <th>#</th>
                <th>Content</th>
                <th>Meaning</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.renderWordRows()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
