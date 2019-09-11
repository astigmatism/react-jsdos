import React from 'react'

class ResolutionButton extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <li>
                <button onClick={() => this.props.handleResolutionChange(`x${this.props.width}x${this.props.height}`)}>
                    {`${this.props.name} (${this.props.width}x${this.props.height})`}
                </button>
            </li>
        )
    }
}

export default ResolutionButton