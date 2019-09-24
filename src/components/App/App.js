import React from 'react';
import './App.css'
import Header from '../Header/Header'
import JsDos from '../JsDos/JsDos'
import Tools from '../Tools/Tools'
import TitleSelection from '../TitleSelection/TitleSelection'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      dosBoxResolution: JSON.parse(localStorage.getItem('App.dosBoxResolution')) || [640, 480],
      activeTitle: null
    }

    this.handleResolutionChange = this.handleResolutionChange.bind(this)
    this.loadTitle = this.loadTitle.bind(this)
    this.dosBoxCommand = this.dosBoxCommand.bind(this)
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
          <JsDos ref='jsdos' dosBoxResolution={dosBoxResolution} activeTitle={activeTitle} />
            <div className='content'>
              <TitleSelection loadTitle={this.loadTitle} />
              <Tools handleResolutionChange={this.handleResolutionChange} activeTitle={activeTitle} loadTitle={this.loadTitle} dosBoxCommand={this.dosBoxCommand} />
            </div>
        </div>
      </div>
    )
  }
}

export default App;
