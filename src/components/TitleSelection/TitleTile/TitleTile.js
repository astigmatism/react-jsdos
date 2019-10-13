import React, { useState } from 'react'
import { Animated } from 'react-animated-css'
import './TitleTile.css'
import TitleTooltip from './TitleTooltip'
import ContextMenu from './ContextMenu'

class Title extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      contextOpen: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {

  }

  handleClick() {
    this.setState({
      contextOpen: !this.state.contextOpen
    })
  }

  render() {

    const animDelay = this.props.iteration * 70
    const animDuration = 1000

    let imgStyle = {
      backgroundImage: 'url(' + this.props.data.thumbs[0] + ')'
    }

    return (
      <Animated animationIn='flipInX' animationInDelay={animDelay} animationInDuration={animDuration} isVisible={true}>
        <li ref='titleTile' className='titleTile' id={'titletile_' + this.props.iteration}>
            <div key='' onClick={this.handleClick} className='image' width='100%' style={imgStyle} alt='' />
            { /* <TitleTooltip iteration={this.props.iteration} data={this.props.data}></TitleTooltip> */}
            <ContextMenu data={this.props.data} contextOpen={this.state.contextOpen} loadTitle={this.props.loadTitle} toggle={this.handleClick}></ContextMenu>
        </li>
      </Animated>
    )
  }
}

export default Title