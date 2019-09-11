import React from 'react';
import './App.css'
import Header from '../Header/Header'
import Search from '../Search/Search'
import JsDos from '../JsDos/JsDos'
import Tools from '../Tools/Tools'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      resolutionName: 'x640x480',
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
  }

  resolutionChanged(resolutionName) {
    this.setState({
      resolutionName: resolutionName
    });
  }

  render() {

    return (
      <div className="App">
        <Search />
        <JsDos ref={this.dosBoxCommand} resolutionName={this.state.resolutionName} activeTitle={this.state.activeTitle} />
        <Tools resolutionChanged={this.resolutionChanged} loadTitle={this.loadTitle} unloadTitle={this.unloadTitle} dosBoxCommand={this.dosBoxCommand} />
      </div>
    )
  }
}

export default App;
