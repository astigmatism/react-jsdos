import React from 'react'
import './ToolTray.css';
import { Button, Collapse } from 'reactstrap';
import ResolutionDropdown from './ResolutionDropdown'

class ToolTray extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      trayIsOpen: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {

    console.log(nextProps.jsDosState)

    return true
  }

  handleClick(command) {
    this.props.dosBoxCommand(command)
  }

  render() {

    return (
      <div className='tooltray'>
        <Collapse isOpen={this.props.jsDosState === 'playing'}>
          <ul>
              <li>
                  <Button className='tooltraybutton' onClick={() => this.handleClick('stop')} color="danger" size="sm">Stop Game</Button>{' '}
              </li>
              <li>
                  <ResolutionDropdown handleResolutionChange={this.props.handleResolutionChange}></ResolutionDropdown>
              </li>
              <li>
                  <Button className='tooltraybutton' onClick={() => this.handleClick('fullscreen')} color="primary" size="sm">Fullscreen</Button>{' '}
              </li>
              <li>
                  <Button className='tooltraybutton' onClick={() => this.handleClick('screenshot')} color="info" size="sm">Take Screenshot</Button>{' '}
              </li>
              <li>
                  <Button className='tooltraybutton' onClick={() => this.handleClick('cycledown')} color="warning" size="sm">Decrease CPU Speed</Button>{' '}
              </li>
              <li>
                  <Button className='tooltraybutton' onClick={() => this.handleClick('cycleup')} color="success" size="sm">Increase CPU Speed</Button>{' '}
              </li>
          </ul>
        </Collapse>
      </div>
    )
  }
}

export default ToolTray
