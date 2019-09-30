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

    let imgStyle = {
      backgroundImage: 'url(' + this.props.data.thumbs[0] + ')'
    }

    return (
      <li ref='titleTile' className='titleTile' onClick={this.handleClick}>
          {this.props.data.thumbs.length > 0 ? <div className='image' width='100%' style={imgStyle} alt='' /> : ''}
          <div className='caption'>
            {this.props.data.title}
          </div>
      </li>
    )
  }
}

export default Title