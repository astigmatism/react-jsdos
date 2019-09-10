import React from 'react';
import './JsDos.css';

class JsDos extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rootContentToExtract: null,
            gameFolderContentToExtract: 'zakenh',
            commandInterface: null
        }
    }

    componentDidMount() {
        this.startDos()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.startDos()
    }

    startDos() {
        window.Dos(this.refs.canvas, {
            cycles: 'max',
            wdosboxUrl: "javascripts/wdosbox.js",
            log: (message) => {
                console.log(message);
            },
            onerror: (message) => {
                console.log(message);
            }
        }).ready((fs, main) => {
      
            fs.extract('games/' + this.state.gameFolderContentToExtract + '.zip', '/' + this.state.gameFolderContentToExtract).then(() => {
            //extractFilesToRoot(fs).then(() => {
              main(['-conf', this.state.gameFolderContentToExtract + '/dosbox.conf']).then((ci) => {
                this.state.commandInterface = ci;
              });
            //});
          });
      
        }).catch((message) => {
          console.log(message);
        });
    }

    render() {

        return (
            <div className='jsdos'>
                <canvas ref='canvas' onContextMenu={event => event.preventDefault()}></canvas>
            </div>
        )
    }
}

export default JsDos;