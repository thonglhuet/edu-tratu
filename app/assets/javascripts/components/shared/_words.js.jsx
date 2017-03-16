var Words = React.createClass({
  getInitialState: function(){
    return {
      words: this.props.words,
      words_detail: [],
      word_detail: []
    }
  },
  handleClick: function(event){
    event.preventDefault()
    $.ajax({
      url: '/searchs/'+event.currentTarget.dataset.id,
      dataType: 'json',
      success: function(data){
       this.setState({
        words_detail: data,
        word_detail: data !=null ? data.word_details :null,
        words: []
       })
      }.bind(this),
      error: function(xhr, status, err){
      }
    })
  },
  makeWordList: function(word) {
    return (
      <li key={word.id} data-id={word.id}  onClick={this.handleClick}>
        <i className="fa fa-angle-double-right"></i> <a href="#">{word.content}</a>
      </li>
    )
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({
     words: this.props.words,
     words_detail: []
    });
  },
  render: function(){
    let kq
    let wordsNote = (
      <ul>
        {this.props.words.map(this.makeWordList)}
      </ul>
    )
    let wordDetailsNote = (
      <div className='words-detail'>
        <h3>{this.state.words_detail.content}</h3>
        <div className='words_meaning'>
          <i>{this.state.words_detail.content} :</i>{this.state.words_detail.meaning}
        </div>
        <div className='words-detail-content'>
          {wordNote}
        </div>
      </div>
    )
    let wordNote =this.state.word_detail.map(function(word,index) {
     return <WordDetails data={word} key={index}/>
    })
    let nullNote = (
      <div className='alert alert-warning'>
        Not found word in dictionary!
      </div>
    )

    if(this.state.words_detail.content){
      kq = (
        <div className='words-list-content'>
          {wordDetailsNote}{wordNote}
        </div>
      )
    }else if(this.props.words.length == 0){
      kq = (
        <div className='words-list-content'>
          {nullNote}
        </div>
      )
    }else{
      kq = (
        <div className='words-list-content'>
         {wordsNote}
        </div>
      )
    }

    return(
      <div>{kq}</div>
    )
  }
})
