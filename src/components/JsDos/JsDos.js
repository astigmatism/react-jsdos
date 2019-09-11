import React from 'react';
import './JsDos.css';

class JsDos extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cycles: 'max',
            rootContentToExtract: 'samnmaxcd',
            gameFolderContentToExtract: 'SAMNMAX.CD',
            commandInterface: null
        }
    }

    componentDidMount() {
        this.startDos()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //this.startDos()
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
                this.extractFilesToRoot(fs).then(() => {
                    main(['-conf', this.state.gameFolderContentToExtract + '/dosbox.conf']).then((ci) => {
                        this.setState()
                    });
                });
            });
      
        }).catch((message) => {
          console.log(message);
        });
    }

    extractFilesToRoot = async (fs) => {
        if (this.state.rootContentToExtract == null) return;
        return await fs.extract('games/' + this.state.rootContentToExtract + '.zip');
    }

    handleContextMenu(e) {
        e.preventDefault()
    }

    render() {

        return (
            <div className='jsdos'>
                <canvas ref='canvas' onContextMenu={this.handleContextMenu}></canvas>
            </div>
        )
    }
}

export default JsDos;