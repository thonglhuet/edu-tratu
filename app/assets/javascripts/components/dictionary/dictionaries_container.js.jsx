var DictionariesContainer = React.createClass({
  getInitialState: function(){
    return {
      dictionaries: this.props.dictionaries,
      categories: this.props.categories
    }
  },
  parentDictionarySubmit: function(url, formData, onSuccess, onError){
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: formData,
      success: function(dictionaries) {
        this.setState({dictionaries: dictionaries});
        onSuccess();
      }.bind(this),
      error: function(response, status, err) {
        console.log(response.responseJSON);
        onError(response.responseJSON);
      }
    });
  },
  parentUpdateDictionary: function(formData, onSuccess, onError){
    $.ajax({
      url: ('/dictionaries/' + formData['dictionary']['id']),
      dataType: 'json',
      type: 'PATCH',
      data: formData,
      success: function(dictionaries) {
        console.log(dictionaries);
        this.setState({dictionaries: dictionaries, showNewForm: false});
        onSuccess();
      }.bind(this),
      error: function(response, status, err) {
        onError(response.responseJSON)
      }
    });
  },
  parentDeleteDictionary: function(formData){
    $.ajax({
      url: ('/dictionaries/' + formData['id']),
      dataType: 'json',
      type: 'DELETE',
      data: {},
      success: function(dictionaries) {
        this.setState({dictionaries: dictionaries, showNewForm: false});
      }.bind(this),
      error: function(response, status, err) {
        alert('Cannot delete dictionary');
      }
    });
  },
  render: function() {
    return(
      <div>
        <h1> Dictionary List </h1>
        <DictionaryTable
          dictionaries={this.state.dictionaries}
          categories={this.state.categories}
          parentUpdateDictionary={this.parentUpdateDictionary}
          parentDeleteDictionary={this.parentDeleteDictionary} />
        <NewDictionaryForm
          parentDictionarySubmit={this.parentDictionarySubmit}
          categories={this.state.categories} />
      </div>
    );
  }
});
