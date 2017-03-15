var WordsNewContainer = React.createClass({
  getInitialState: function(){
    return {
      dictionaries: this.props.dictionaries,
    }
  },
  parentWordSubmit: function(formData, onSuccess, onError){
    $.ajax({
      url: '/words',
      type: 'POST',
      data: formData,
      success: function(status) {
        onSuccess();
      }.bind(this),
      error: function(response, status, err) {
        onError(response.responseJSON);
      }
    });
  },
  render: function() {
    return(
      <div>
        <h1> New Word </h1>
        <NewWordForm
          parentWordSubmit={this.parentWordSubmit}
          dictionaries={this.state.dictionaries} />
      </div>
    );
  }
});
