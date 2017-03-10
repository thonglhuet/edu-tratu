var DictionaryTable = React.createClass({
  renderDictionaryRows: function(){
    return (
      this.props.dictionaries.map(function(dictionary){
        return(
          <DictionaryRow
            key={dictionary.id}
            id={dictionary.id}
            categories={this.props.categories}
            category_id={dictionary.category.id}
            category_name ={dictionary.category.name}
            name={dictionary.name}
            description={dictionary.description}
            parentUpdateDictionary={this.props.parentUpdateDictionary}
            parentDeleteDictionary={this.props.parentDeleteDictionary} />
        );
      }.bind(this))
    );
  },
  render: function() {
    return(
      <div>
        <div className="row dic_head">
          <div className="col-sm-2">
          </div>
          <div className="col-sm-2 dic_head_text">
            Category
          </div>
          <div className="col-sm-2 dic_head_text">
            Name
          </div>
          <div className="col-sm-4 dic_head_text">
            Description
          </div>
        </div>
        {this.renderDictionaryRows()}
      </div>
    );
  }
});
