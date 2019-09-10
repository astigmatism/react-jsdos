import React from 'react';
import './App.css'
import Header from '../Header/Header'
import JsDos from '../JsDos/JsDos'
import VideoTools from '../VideoTools/VideoTools'

class App extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {

    //put display logic here

    return (
      <div className="App">
        <JsDos />
        <VideoTools />
      </div>
    )
  }
}

export default App;
