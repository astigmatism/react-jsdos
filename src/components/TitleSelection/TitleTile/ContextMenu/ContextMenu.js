import React from 'react';
import './ContextMenu.css'
import { Collapse, Button } from 'reactstrap';
import ExeOption from './ExeOption'
import SoundOption from './SoundOption'
import SoundConfiguration from '../../../App/Conf/SoundConfiguration'

class ContextMenu extends React.Component {
  
    constructor(props) {
        super(props)

        this.state = {
            data: this.props.data
        }

        this.handleExeSelection = this.handleExeSelection.bind(this)
        this.handleAudioSelection = this.handleAudioSelection.bind(this)
    }

    handleAudioSelection(soundId) {

        this.setState(prevState => ({
            data: {
                ...prevState.data,
                soundSelection: soundId
            }
        }))
    }

    handleExeSelection(exe) {

        let data = this.state.data
        if (exe) {
            data.exeSelection = exe
        }

        window.scrollTo(0, 0);

        this.props.loadTitle(data)
        this.props.toggle()
    }
    
    render() {

        let soundOptions = <div className='sound'>{SoundConfiguration[this.props.data.soundSelection].name}</div>
        if (this.props.data.soundOptions.length > 1) {
            soundOptions = <SoundOption data={this.props.data} onAudioSelected={this.handleAudioSelection}></SoundOption>
        }

        let exeOptions = <Button className='play' color='secondary' onClick={() => this.handleExeSelection() } size="sm">Play</Button>
        if (this.props.data.exeOptions.length > 1) {
            exeOptions = <ExeOption data={this.props.data} onExeSelected={this.handleExeSelection}></ExeOption>
        }

        return (
            <div className='contextMenu'>
              <Collapse isOpen={this.props.contextOpen}>
                <div className='contextMenuContent'>
                    <div className='title'>{this.props.data.title}</div>
                    <div className='year'>({this.props.data.year})</div>
                    <div className='genres'>{this.props.data.genres.join(', ')}</div>
                    <div className='perspectives'>{this.props.data.perspectives.join(', ')}</div>
                    {soundOptions}
                    {exeOptions}
                </div>
              </Collapse>
            </div>
        )
    }
  
}

export default ContextMenu;