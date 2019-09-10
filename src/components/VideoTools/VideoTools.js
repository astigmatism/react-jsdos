import React from 'react';
import './VideoTools.css';
import VideoToolButton from './VideoToolButton'

const VideoTools = () => {
    return (
        <ul className='videotools-ul'>
            <VideoToolButton />
            <VideoToolButton />
            <VideoToolButton />
        </ul>
    )
}

export default VideoTools;
