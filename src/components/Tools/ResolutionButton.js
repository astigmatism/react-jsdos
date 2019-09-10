import React from 'react'

class ResolutionButton extends React.Component {

    constructor(props) {
        super(props)

        const name = this.props.name
        const width = this.props.width
        const height = this.props.height
    }

    handleClick(e) {

    }

    render() {
        return (
            <li>
                <button onClick={this.handleClick}>{`${this.name} (${this.width}x${this.height})`}</button>
            </li>
        )
    }
}

export default ResolutionButton