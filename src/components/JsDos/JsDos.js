import React from 'react';
import './JsDos.css';
import Loading from './Loading/Loading'

class JsDos extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            isGameLoading: false,
            isGameRunning: false,
            commandInterface: null,
            operation: null,
            percentage: 0
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

        return true
    }

    handleDosBoxCommand(command) {

        if (this.state.commandInterface === null)
            return

        switch (command) {
            case 'screenshot':
                this.state.commandInterface.screenshot().then((data) => {
                    console.log(data)
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
        this.refs.canvas.style.opacity = 0;
        this.setState({
            commandInterface: null,
            isGameRunning: false
        })
    }

    startDos(titleData) {
        
        if (this.state.isGameLoading || this.state.isGameRunning)
            return
        
        this.refs.dialogs.style.display = 'block'
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
            },
            onprogress: (stage, total, loaded) => {
                console.log(stage, loaded * 100 / total + "%");
                this.setState({
                    percentage: loaded * 100 / total,
                    operation: stage
                })
            }
        }).ready((fs, main) => {
            
            this.setState({
                operation: 'extracting'
            })

            fs.extract('games/' + titleData.key + '/b.zip', '/' + titleData.bfolder).then(() => {
                this.extractFilesToRoot(fs, titleData).then(() => {
                    main(['-conf', titleData.bfolder + '/dosbox.conf']).then((ci) => {
                        
                        this.refs.canvas.style.opacity = 1;
                        this.refs.dialogs.style.display = 'none'

                        this.setState({
                            isGameLoading: false,
                            isGameRunning: true,
                            percentage: 0,
                            operation: null,
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
            return await fs.extract('games/' + titleData.key + '/a.zip');
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
                <div className='dialogs' ref='dialogs'>
                    {this.state.isGameLoading && <Loading operation={this.state.operation} percentage={this.state.percentage} />}
                </div>
                <canvas ref='canvas' className={[resolutionClass,'jsdos-canvas'].join(' ')} onContextMenu={(e) => { e.preventDefault() }}></canvas>
            </div>
        )
    }
}

export default JsDos;