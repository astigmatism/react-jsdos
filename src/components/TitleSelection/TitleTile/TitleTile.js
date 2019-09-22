import React from 'react'
import './TitleTile.css'

class Title extends React.Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {

  }

  handleClick() {
    this.props.loadTitle(this.props.data)
  }

  render() {

    return (
      <li ref='titleTile' className='titleTile' onClick={this.handleClick}>
          {this.props.data.thumbs.length > 0 ? <img width='100%' src={this.props.data.thumbs[0]} alt='' /> : ''}
          <div className='caption'>
            {this.props.data.title}
          </div>
      </li>
    )
  }
}

export default Title