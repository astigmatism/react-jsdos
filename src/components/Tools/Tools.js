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
                handleResolutionChange={this.props.resolutionChanged}
                />
        );

        return (
            <div>
                <ul className='videotools-ul'>
                    {buttonComponents}
                </ul>
                <ul className='dostools-ul'>
                    <li>
                        <button onClick={() => this.props.loadTitle(null, 'zakenh')}>Load Zak</button>
                    </li>
                    <li>
                        <button onClick={() => this.props.loadTitle('samnmaxcd', 'samnmax.cd')}>Load Sam and Max</button>
                    </li>
                    <li>
                        <button onClick={() => this.props.loadTitle(null, 'simcity2')}>Load Sim City 2000</button>
                    </li>
                    <li>
                        <button onClick={() => this.props.unloadTitle()}>Stop</button>
                    </li>
                    <li>
                        <button onClick={() => this.props.dosBoxCommand('screenshot')}>Take Screenshot</button>
                    </li>
                </ul>
            </div>
        )
    }

}

export default Tools;
