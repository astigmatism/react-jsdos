import React from 'react';
import './App.css'
import Header from '../Header/Header'
import Search from '../Search/Search'
import JsDos from '../JsDos/JsDos'
import Tools from '../Tools/Tools'

class App extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {

    //put display logic here

    return (
      <div className="App">
        <Header />
        <Search />
        <JsDos />
        <Tools />
      </div>
    )
  }
}

export default App;
