import React from 'react';
import './Tools.css';
import ResolutionButton from './ResolutionButton'
import ResolutionData from './ResolutionData'

class Tools extends React.Component {

    render() {

        const buttonComponents = ResolutionData.map(resolutionData => 

            <ResolutionButton 
                key={resolutionData.id} 
                name={resolutionData.name} 
                width={resolutionData.width} 
                height={resolutionData.height} />
        );

        return (
            <ul className='videotools-ul'>
                {buttonComponents}
            </ul>
        )
    }

}

export default Tools;
