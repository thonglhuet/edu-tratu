var WordTable = React.createClass({
  renderWordRows: function(){
    return (
      this.props.words.map(function(word, index){
        return(
          <WordRow
            key={word.id}
            id={word.id}
            content={word.content}
            meaning={word.meaning}
            index={index}
            parentUpdateWord={this.props.parentUpdateWord}
            parentDeleteWord={this.props.parentDeleteWord} />
        );
      }.bind(this))
    );
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
