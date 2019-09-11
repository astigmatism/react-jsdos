import React from 'react';
import './JsDos.css';

class JsDos extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            commandInterface: null
        }

        this.startDos = this.startDos.bind(this)
        this.stopDos = this.stopDos.bind(this)
    }

    componentDidMount() {
        //this.startDos()
    }

    shouldComponentUpdate(nextProps, nextState) {
        
        if (nextProps.activeTitle !== this.props.activeTitle) {

            if (nextProps.activeTitle === null && this.state.commandInterface !== null) {
                this.stopDos()
                return false
            }

            this.startDos(nextProps.activeTitle.rootContentCompressedFileName, nextProps.activeTitle.folderContentCompressedFileName)
            return false
        }

        // if (nextProps.dosBoxCommand !== this.props.dosBoxCommand && this.state.commandInterface !== null) {
        //     this.dosBosCommand(nextProps.dosBoxCommand)
        //     return false
        // }

        if (nextProps.resolutionName !== this.props.resolutionName) 
            return true

        return false
    }

    dosBosCommand(cmd) {

        switch (cmd) {
            case 'screenshot':
                this.state.commandInterface.screenshot().then((data) => {
                    const w = window.open("about:blank", "image from canvas");
                    w.document.write("<img src='" + data + "' alt='from canvas'/>");
                })
                break
            default:
                break
        }
    }

    stopDos() {
        this.state.commandInterface.exit()
        this.setState({
            commandInterface: null
        })
    }

    startDos(rootContentCompressedFileName, folderContentCompressedFileName) {
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
      
            fs.extract('games/' + folderContentCompressedFileName + '.zip', '/' + folderContentCompressedFileName).then(() => {
                this.extractFilesToRoot(fs, rootContentCompressedFileName).then(() => {
                    main(['-conf', folderContentCompressedFileName + '/dosbox.conf']).then((ci) => {
                        this.setState({
                            commandInterface: ci
                        })
                    })
                })
            })
      
        }).catch((message) => {
          console.log(message);
        })
    }

    extractFilesToRoot = async (fs, rootContentCompressedFileName) => {
        if (rootContentCompressedFileName == null) return;
        return await fs.extract('games/' + rootContentCompressedFileName + '.zip');
    }

    handleContextMenu(e) {
        e.preventDefault()
    }

    render() {
        return (
            <div className='jsdos'>
                <canvas ref='canvas' className={this.props.resolutionName} onContextMenu={this.handleContextMenu}></canvas>
            </div>
        )
    }
}

export default JsDos;