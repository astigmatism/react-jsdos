import React from 'react'
import * as THREE from 'three';

class Welcome extends React.Component {

    constructor(props) {
        super(props)

        this.canvas = null

        this.start = this.start.bind(this);
    }

    start() {

    }

    componentDidMount() {
        //this.start();
        this.refs.dialog.style.opacity = 1
    }

    shouldComponentUpdate(nextProps) {
        console.log(nextProps)
        return true
    }

    render() {
        return (
            <div ref='dialog' className='dialog'></div>
        )
    }
}

export default Welcome