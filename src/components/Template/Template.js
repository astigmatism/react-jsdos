import React from 'react'

class Template extends React.Component {
  
  constructor() {
    super()
    this.state = {
      resolution: [640, 480]
    }
  }

  static getDerivedStateFromProps(props, state) {
    //return the new, updating state based on the props
    //the rare cases when your component takes in new props and set state
  }

  getSnapshotBeforeUpdate() {
    //lifecycle method: create a backup of the current way things are. an object, a "snapshot"
  }

  componentDidMount() {
    //lifecycle method: just mounted to the screen. only runs once
    //common use cases: api calls to fill in content
  }

  //depricated
  /*
  componentWillReceiveProps(nextProps) {
    //lifecycle method. runs when getting props from a parent
    //runs every time a parent component sends props
  }
  */

  shouldComponentUpdate(nextProps, nextState) {
    //lifestyle method: 
    //return true if we want it to update
  }

  componentWillUnmount() {
    //lifestyle method: clean up or tear down in the dom or application
    //event listeners
  }

  resolutionChanged(width, height) {
    this.setState({
      resolution: [width, height]
    });
  }

  render() {

    return (
      <div></div>
    )
  }
}

export default Template