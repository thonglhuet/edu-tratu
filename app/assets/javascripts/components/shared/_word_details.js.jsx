var WordDetails = React.createClass({
 render: function(){
   return(
    <div className="word-details-type">
      <hr />
      <span>
        <i className="fa fa-angle-double-right"></i> {this.props.data.kind}
      </span>
      <div className='word_details_meaning'>
        {this.props.data.meaning}
      </div>
    </div>
  )
 }
})
