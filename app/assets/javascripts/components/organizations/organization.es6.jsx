class Organization extends React.Component{
  constructor(props) {
    super(props);
    this._handClick = this._handClick.bind(this)
    this._handUpdate = this._handUpdate.bind(this)
  }
  _handClick(e){
    e.preventDefault()
    this.props.handleDelete(e.currentTarget.dataset.id)
  }
  _handUpdate(e){
    e.preventDefault()
    this.props.handleUpdate(e.currentTarget.dataset.id)
  }
  render(){
    return(
      <tr>
        <td>{this.props.index}</td>
        <td><a href='#'>{this.props.data.name}</a></td>
        <td>{this.props.data.created_at}</td>
        <td className='action'>
          <a href="#" className='btn btn-info btn-round' data-id={this.props.data.id} onClick={this._handUpdate}>
            <i className="fa fa-pencil"></i>
          </a>
          <a href="#" className='btn btn-danger btn-round' data-id={this.props.data.id} onClick={this._handClick}>
            <i className="fa fa-trash-o"></i>
          </a>
        </td>
      </tr>
    )
  }
}
