var Modal = React.createClass({
  getInitialState: function(){
    return {
      words: this.props.words
    }
  },
  componentDidMount(){
    $(ReactDOM.findDOMNode(this)).modal('show');
    $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
  },
  handleClick: function(e,id){
    $(ReactDOM.findDOMNode(this.refs.loadbar)).show();
    $(ReactDOM.findDOMNode(this.refs.quiz)).fadeOut();
    setTimeout(function(){
    }, 1500);
  },
  makeWordList: function(word){
    return(
      <label className='element-animation1 btn btn-lg btn-primary btn-block' key={word.id}
        onClick={this.handleClick.bind(this,word)} >
        <span className='btn-label'><i className='glyphicon glyphicon-chevron-right'></i></span>{word.content}
        <input type='hidden' value={word.id} ref='word_id' />
      </label>
    )
  },
  render: function(){
    return(
      <div className='modal fade' id='modal'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
              <h3><span className="label label-warning" id="qid">{this.state.words.length}</span> SUGGUEST WORDS</h3>
            </div>
            <div className='modal-body'>
              <div className='col-xs-3 col-xs-offset-5'>
                <div id='loadbar' ref='loadbar'>
                  <div className="blockG" id="rotateG_01"></div>
                  <div className="blockG" id="rotateG_02"></div>
                  <div className="blockG" id="rotateG_03"></div>
                  <div className="blockG" id="rotateG_04"></div>
                  <div className="blockG" id="rotateG_05"></div>
                  <div className="blockG" id="rotateG_06"></div>
                  <div className="blockG" id="rotateG_07"></div>
                  <div className="blockG" id="rotateG_08"></div>
                </div>
              </div>
              <div className='quiz' id='quiz' data-toggle='buttons' ref='quiz'>
                {this.state.words.map(this.makeWordList)}
              </div>
            </div>
            <div className='modal-footer'>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
