import React from 'react';
import './ContextMenu.css'
import { Collapse, Button } from 'reactstrap';
import SoundConfiguration from '../../../App/Conf/SoundConfiguration'

class ContextMenu extends React.Component {
  
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(soundId) {

        let data = this.props.data
        data.soundSelection = soundId

        this.props.loadTitle(data)
        this.props.toggle()
    }

    render() {


        let soundIntro = <div className='sound'>{SoundConfiguration[this.props.data.soundSelection].name}</div>
        let soundButtons = <Button color='info' onClick={() => this.handleClick(this.props.data.soundSelection) } size="sm">Play</Button>

        if (this.props.data.soundOptions.length > 1) {
            soundIntro = null
            soundButtons = [...this.props.data.soundOptions].map(soundId =>
                <Button key={soundId} className='soundButton' color={SoundConfiguration[soundId].color} onClick={() => this.handleClick(soundId) } size="sm">{SoundConfiguration[soundId].name}</Button>
            )
        }

        return (
            <div className='contextMenu'>
              <Collapse isOpen={this.props.contextOpen}>
                <div className='contextMenuContent'>
                    <div className='title'>{this.props.data.title}</div>
                    <div className='year'>({this.props.data.year})</div>
                    <div className='genre'>{this.props.data.genres.join(', ')}</div>
                    <div className='perspective'>{this.props.data.perspectives.join(', ')}</div>
                    {soundIntro}
                    <div className='soundButtons'>
                        {soundButtons}
                    </div>
                </div>
              </Collapse>
            </div>
        )
    }
  
}

export default ContextMenu;