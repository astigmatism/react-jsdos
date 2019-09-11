import React from 'react'

class ResolutionButton extends React.Component {

    constructor(props) {
        super(props)
    }

    handleClick(e) {

    }

    render() {
        return (
            <li>
                <button onClick={this.handleClick}>{`${this.props.name} (${this.props.width}x${this.props.height})`}</button>
            </li>
        )
    }
}

export default ResolutionButton