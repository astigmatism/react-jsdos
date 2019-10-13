import React, { useState } from 'react';
import { Collapse, ListGroup, ListGroupItem } from 'reactstrap';

class ContextMenu extends React.Component {
  
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        this.props.loadTitle(this.props.data)
        this.props.toggle()
    }

    render() {

        let soundsOptions = [
            
        ]

        return (
            <div className='contextMenu'>
              <Collapse isOpen={this.props.contextOpen}>
                <div>{this.props.data.title} ({this.props.data.year})</div>
                <ListGroup>
                    <ListGroupItem tag="button" action onClick={this.handleClick}>Sound Blaster 16</ListGroupItem>
                    <ListGroupItem disabled tag="button" action>Gravis Ultrasound</ListGroupItem>
                </ListGroup>
              </Collapse>
            </div>
        )
    }
  
}

export default ContextMenu;