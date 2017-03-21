var FileUploadInput = React.createClass({
  getInitialState: function() {
    return {
      dictionary_id: this.props.dictionary_id,
      value: "",
      file: false,
      progress: null,
      added_from_file: false,
      added_from_file_failed: false};
  },
  resetState: function() {
    this.setState({
      dictionary_id: this.props.dictionary_id,
      value: "",
      file: false,
      progress: null,
      added_from_file: false,
      added_from_file_failed: false
    });
  },
  componentDidMount(){
     $(ReactDOM.findDOMNode(this)).modal('show');
     $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
  },
  handleDictionaryChange: function(e){
    this.setState({dictionary_id: e.target.value});
  },
  beginUpload: function() {
    if (!this.state.file) {
      return false;
    }
    var that = this;
    var formData = new FormData();
    var request = new XMLHttpRequest();

    formData.append("file", this.state.file);
    formData.append("dictionary_id", this.state.dictionary_id);
    request.onerror = function() {
      that.setState({error: true, result: "Upload failed."});
    };
    request.onreadystatechange = function() {
      if (this.readyState == 4) {
        that.setState({file: false, progress: null});
        that.onFileSuccess(JSON.parse(request.responseText), that.state.dictionary_id);
      } else if (this.status == 500) {
        that.setState({file: false, progress: null});
        that.onFileError();
      }
    };
    request.upload.onprogress = function(oEvent) {
      if (oEvent.lengthComputable) {
        that.setState({ progress: Math.max(1, Math.ceil(100 * (oEvent.loaded/oEvent.total)))  })
      }
    };
    request.open('POST', this.props.url);
    request.responseType = 'text';
    request.send(formData);
    that.setState({ progress: 0 })
  },
  onChange: function(event) {
    var r = new RegExp(this.props.filter, 'i');
    var file = event.target.files[0];
    if (!(file.type||"").match(r)) {
      alert("Invalid file name");
      return false;
    }
    this.setState({ file: file });
    return false;
  },
  result: function() {
    var html = [(<div className={"alert " + (this.state.error ? "alert-danger" : "alert-success")}>{this.state.result}</div>)];
    return html;
  },
  makeDictionarySelection: function(dictionary){
    return <option key={dictionary.id} value={dictionary.id}>{dictionary.name}</option>;
  },
  renderDictionaryFields: function(){
    return [
      <label>Dictionary Name<span className='require'>*</span></label>,
      <select className="form-control form-group" name="word[dictionary_id]"
        onChange={this.handleDictionaryChange} value={this.state.dictionary_id}>
          {this.props.dictionaries.map(this.makeDictionarySelection)}
      </select>
    ];
  },
  onFileSuccess: function(words, dictionary_id) {
    this.props.parentOnFileSuccess(words, dictionary_id);
    this.resetState();
    this.setState({
      added_from_file: true,
      added_from_file_failed: false
    });
  },
  onFileError: function() {
    this.resetState();
    this.setState({
      added_from_file: false,
      added_from_file_failed: true
    });
  },
  render: function() {
    var fieldRender = [this.renderDictionaryFields()];
    var file = this.state.file;
    if (this.state.result) {
      fieldRender.push(
        <div>
          <div>{this.result()}</div>
        </div>);
    } else if (typeof this.state.progress === "number") {
        fieldRender.push(
          <div>
            <div>Upload file {file.name}</div>
            <div>Uploading {this.state.progress}%</div>
          </div>);
    } else if (file) {
      fieldRender.push(
        <div>
          <div>Upload file {file.name} ({humanFormat(file.size)}).</div>
          <div><button className="btn btn-default" onClick={this.beginUpload}>Begin upload</button></div>
        </div>);
    } else {
      fieldRender.push(
        <input className="form-control" type="file" onChange={this.onChange} value={this.state.value}/>
      );
    }

    var failMessage = (
      <div className='row'>
        <div className='col-sm-12 alert alert-danger'>
          <strong>Create words from file fail!</strong>
        </div>
      </div>);

    var successMessage = (
      <div className='row'>
        <div className='col-sm-12 alert alert-success'>
          <strong>Create words from file successfully!</strong>
        </div>
      </div>);

    return (
    <div className='modal fade'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
            <h3>Import Word</h3>
          </div>
          <div className='modal-body'>
            {fieldRender}
            {this.state.added_from_file ? successMessage : null}
            {this.state.added_from_file_failed ? failMessage : null}
            <div className='row'>
              <div className='col-sm-2'>
                <button type='button' className='btn btn-danger' data-dismiss='modal'>Close</button>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
          </div>
        </div>
      </div>
    </div>
    );
  }
});
