import React from 'react';
import './App.css'
import Header from '../Header/Header'
import JsDos from '../JsDos/JsDos'
import DevTools from '../Tools/DevTools'
import ToolTray from '../Tools/ToolTray'
import TitleSelection from '../TitleSelection/TitleSelection'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      dosBoxResolution: JSON.parse(localStorage.getItem('App.dosBoxResolution')) || [640, 480],
      activeTitle: null,
      jsDosState: null
    }

    this.handleResolutionChange = this.handleResolutionChange.bind(this)
    this.loadTitle = this.loadTitle.bind(this)
    this.dosBoxCommand = this.dosBoxCommand.bind(this)
    this.handleJsDosStateChange = this.handleJsDosStateChange.bind(this)
  }

  handleJsDosStateChange (state) {
    this.setState({
      jsDosState: state
    })
  }

  loadTitle (titleData) {
    this.setState({
      activeTitle: titleData
    })
  }

  dosBoxCommand(command) {

    if (command === 'stop') {
      this.setState({
        activeTitle: null
      })
    }

    this.refs.jsdos.handleDosBoxCommand(command)
  }

  handleResolutionChange(width, height) {
    localStorage.setItem('App.dosBoxResolution', JSON.stringify([width, height]))
    this.setState({
      dosBoxResolution: [width, height]
    });
  }

  render() {

    const activeTitle = this.state.activeTitle
    const dosBoxResolution = this.state.dosBoxResolution

    return (
      <div className='App'>
        <div className='fixedWidthContainer'>
          <Header />
          <JsDos ref='jsdos' dosBoxResolution={dosBoxResolution} activeTitle={activeTitle} reportState={this.handleJsDosStateChange} />
            <ToolTray jsDosState={this.state.jsDosState} handleResolutionChange={this.handleResolutionChange} dosBoxCommand={this.dosBoxCommand}></ToolTray>
            <div className='content'>
              <TitleSelection loadTitle={this.loadTitle} />
              <DevTools activeTitle={activeTitle} loadTitle={this.loadTitle} />
            </div>
        </div>
      </div>
    )
  }
}

export default App;
