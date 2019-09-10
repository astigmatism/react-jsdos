import React from 'react'

class ResolutionButton extends React.Component {

    render() {
        let name = this.props.name
        let width = this.props.width
        let height = this.props.height

        return (
            <li>
                <button>{`${name} (${width}x${height})`}</button>
            </li>
        )
    }
}

export default ResolutionButton