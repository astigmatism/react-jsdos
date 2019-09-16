import React from 'react';
import './Tools.css';
import ResolutionButton from './ResolutionButton'
import ResolutionData from './ResolutionData'

class Tools extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        const buttonComponents = ResolutionData.map(resolutionData => 

            <ResolutionButton 
                key={resolutionData.id} 
                name={resolutionData.name} 
                width={resolutionData.width} 
                height={resolutionData.height} 
                handleResolutionChange={this.props.handleResolutionChange}
                />
        );

        return (
            <div>
                <ul className='videotools-ul'>
                    {buttonComponents}
                </ul>
                <ul className='dostools-ul'>
                <li>
                        <button onClick={() => this.props.dosBoxCommand('fullscreen')}>Fullscreen</button>
                    </li>
                    <li>
                        <button onClick={() => this.props.dosBoxCommand('stop')}>Stop</button>
                    </li>
                    <li>
                        <button onClick={() => this.props.dosBoxCommand('screenshot')}>Take Screenshot</button>
                    </li>
                    <li>
                        <button onClick={() => this.props.dosBoxCommand('cycledown')}>Decrease CPU</button>
                    </li>
                    <li>
                        <button onClick={() => this.props.dosBoxCommand('cycleup')}>Increase CPU</button>
                    </li>
                </ul>
            </div>
        )
    }

}

export default Tools;
