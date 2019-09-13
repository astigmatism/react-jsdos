import React from 'react'
import './TitleTile.css'

class Title extends React.Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.loadTitle(this.props.data)
  }

  render() {
    return (
      <div className='titleTile' onClick={this.handleClick}>
        {this.props.data.thumbs.length > 0 ? <img width='100%' src={this.props.data.thumbs[0]} /> : ''}
        {this.props.data.title}
      </div>
    )
  }
}

export default Title