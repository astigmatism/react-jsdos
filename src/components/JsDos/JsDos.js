import React from 'react';
import './JsDos.css';

class JsDos extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            isGameLoading: false,
            isGameRunning: false,
            commandInterface: null
        }

        this.startDos = this.startDos.bind(this)
        this.stopDos = this.stopDos.bind(this)
    }

    componentDidMount() {
        //this.startDos()
    }

    shouldComponentUpdate(nextProps, nextState) {
        
        if (nextProps.activeTitle !== null && nextProps.activeTitle !== this.props.activeTitle) {

            this.stopDos().then(() => {
                this.startDos(nextProps.activeTitle)
            })
            return false
        }

        if (nextProps.dosBoxResolution !== this.props.dosBoxResolution) 
            return true

        return false
    }

    handleDosBoxCommand(command) {

        if (this.state.commandInterface === null)
            return

        switch (command) {
            case 'screenshot':
                this.state.commandInterface.screenshot().then((data) => {
                    const w = window.open("about:blank", "image from canvas");
                    w.document.write("<img src='" + data + "' alt='from canvas'/>");
                })
                break
            case 'stop':
                this.stopDos().then(() => {
                    console.log('emulator stopped')
                })
                break
            default:
                break
        }
    }

    async stopDos() {

        if (!this.state.isGameRunning) 
            return

        await this.state.commandInterface.exit()
        this.setState({
            commandInterface: null,
            isGameRunning: false
        })
    }

    startDos(titleData) {
        
        if (this.state.isGameLoading || this.state.isGameRunning)
            return
        
        this.setState({
            isGameLoading: true
        })

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
      
            fs.extract('games/' + titleData.name + '/subfolder.zip', '/' + titleData.subfolder).then(() => {
                this.extractFilesToRoot(fs, titleData).then(() => {
                    main(['-conf', titleData.subfolder + '/dosbox.conf']).then((ci) => {
                        this.setState({
                            isGameLoading: false,
                            isGameRunning: true,
                            commandInterface: ci
                        })
                    })
                })
            })
      
        }).catch((message) => {
          console.log(message);
        })
    }

    extractFilesToRoot = async (fs, titleData) => {
        try {
            return await fs.extract('games/' + titleData.name + '/root.zip');
        }
        catch(e) {
            console.log('no root file to extract')
        }
    }

    render() {

        let resolutionClass = `x${this.props.dosBoxResolution[0]}x${this.props.dosBoxResolution[1]}`
        let jsDosStyles = {
            height: this.props.dosBoxResolution[1] + 'px'
        }

        return (
            <div className='jsdos' style={jsDosStyles}>
                <canvas ref='canvas' className={resolutionClass} onContextMenu={(e) => { e.preventDefault() }}></canvas>
            </div>
        )
    }
}

export default JsDos;