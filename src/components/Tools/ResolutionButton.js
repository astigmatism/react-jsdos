import React from 'react'

class ResolutionButton extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <li>
                <button onClick={() => this.props.handleResolutionChange(this.props.width, this.props.height)}>
                    {`${this.props.width}x${this.props.height}`}
                </button>
            </li>
        )
    }
}

export default ResolutionButton