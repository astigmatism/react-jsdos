import React from 'react';
import './App.css'
import Header from '../Header/Header'
import Search from '../Search/Search'
import JsDos from '../JsDos/JsDos'
import Tools from '../Tools/Tools'
import TitleSelection from '../TitleSelection/TitleSelection'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      resolutionName: localStorage.getItem('App:resolutionName') || 'x640x480',
      activeTitle: null
    }

    this.resolutionChanged = this.resolutionChanged.bind(this)
    this.loadTitle = this.loadTitle.bind(this)
    this.unloadTitle = this.unloadTitle.bind(this)
    this.dosBoxCommand = this.dosBoxCommand.bind(this)
  }

  loadTitle (rootContentCompressedFileName, folderContentCompressedFileName) {
    this.setState({
      activeTitle: {
        rootContentCompressedFileName: rootContentCompressedFileName,
        folderContentCompressedFileName: folderContentCompressedFileName
      }
    })
  }

  unloadTitle() {
    this.setState({
      activeTitle: null
    })
  }

  dosBoxCommand(command) {
    this.refs.jsdos.handleDosBoxCommand(command)
  }

  resolutionChanged(resolutionName) {
    localStorage.setItem('App:resolutionName', resolutionName)
    this.setState({
      resolutionName: resolutionName
    });
  }

  render() {

    const activeTitle = this.state.activeTitle
    const resolutionName = this.state.resolutionName

    return (
      <div className='App'>
        <Search />
        <JsDos ref='jsdos' resolutionName={resolutionName} activeTitle={activeTitle} />
          <div className='content'>
            <Tools resolutionChanged={this.resolutionChanged} loadTitle={this.loadTitle} unloadTitle={this.unloadTitle} dosBoxCommand={this.dosBoxCommand} />
            <TitleSelection />
          </div>
      </div>
    )
  }
}

export default App;
