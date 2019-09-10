import React from 'react';
import './JsDos.css';
import JsDosSource from './JsDosSource'

class JsDos extends React.Component {

    constructor() {
        super()
        this.state = {}
    }

    render() {

        //this.canvas = document.createElement('canvas')
        //this.canvas.addEventListener('contextmenu', event => event.preventDefault());

        return (
            <div className='jsdos'>
                <canvas></canvas>
            </div>
        )
    }
}

export default JsDos;