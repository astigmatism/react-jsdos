import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import SoundConfiguration from '../../../App/Conf/SoundConfiguration'

class SoundOption extends React.Component {
  
    constructor(props) {
        super(props)

        this.state = {
          selection: this.props.data.soundSelection
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e, soundId) {
      this.setState({
        selection: soundId
      })
      this.props.onAudioSelected(soundId);
    }

    render() {

      let soundButtons

      if (this.props.data.soundOptions.length > 1) {
          soundButtons = [...this.props.data.soundOptions].map(soundId =>
              <ListGroupItem active={soundId === this.state.selection}key={soundId} className='soundButton' color={SoundConfiguration[soundId].color} onClick={(e) => this.handleClick(e, soundId) } size="sm" action>{SoundConfiguration[soundId].name}</ListGroupItem>
          )
      }

        return (
            <div className='soundButtons'>
              <div>Select audio:</div>
              <ListGroup>
                {soundButtons}
              </ListGroup>
            </div>
        )
    }
  
}

export default SoundOption;