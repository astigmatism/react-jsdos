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
        {this.props.data.title}
      </div>
    )
  }
}

export default Title