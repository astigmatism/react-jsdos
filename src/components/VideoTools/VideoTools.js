import React from 'react';
import './VideoTools.css';
import ResolutionButton from './ResolutionButton'
import ResolutionData from './ResolutionData'

class VideoTools extends React.Component {

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

export default VideoTools;
