import React from 'react';
import { Button } from 'reactstrap';

class ExeOption extends React.Component {

    render() {

        let buttons

        if (this.props.data.exeOptions.length > 1) {
            buttons = [...this.props.data.exeOptions].map(exe =>
                <Button key={exe.id} className='exeButton' color='secondary' onClick={() => this.props.onExeSelected(exe) } size="sm">{exe.name}</Button>
            )
        }

        return (
            <div className='exeButtons'>
              <div>Select game:</div>
              {buttons}
            </div>
        )
    }
  
}

export default ExeOption;