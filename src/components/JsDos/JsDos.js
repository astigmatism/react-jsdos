import React from 'react';
import './JsDos.css';
import Loading from './Loading/Loading'
import SoundConfiguration from '../App/Conf/SoundConfiguration'

class JsDos extends React.Component {

    constructor(props) {
        super(props)

        this.internalState = {
            idle: 'idle',
            downloading: 'downloading',
            extractingFolder: 'extractingFolder',
            exractingRoot: 'exractingRoot',
            resizeOnStart: 'resizeOnStart',
            starting: 'starting',
            playing: 'playing',
            stopping: 'stopping',
            resizeOnExit: 'resizeOnExit'
        }

        this.state = {
            operation: this.internalState.idle,
            commandInterface: null,
            percentage: 0
        }

        this.resolutionClass = `x${this.props.dosBoxResolution[0]}x${this.props.dosBoxResolution[1]}`

        this.startDos = this.startDos.bind(this)
        this.stopDos = this.stopDos.bind(this)
        this.handleWrapperTransitionEnd = this.handleWrapperTransitionEnd.bind(this)
        this.handleCanvasTransitionEnd = this.handleCanvasTransitionEnd.bind(this)
        this.setOperation = this.setOperation.bind(this)
    }

    componentDidMount() {
        //this.startDos()
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextState.operation === this.internalState.idle && nextProps.activeTitle !== null) {
            this.startDos(nextProps.activeTitle)
            return false
        }

        if (nextState.operation === this.internalState.playing && nextProps.activeTitle !== this.props.activeTitle) {
            this.stopDos()
            return false
        }

        return true
    }

    setOperation(stateObject) {
        this.props.reportState(stateObject.operation)
        this.setState(stateObject)
    }

    handleDosBoxCommand(command) {

        switch (command) {
            case 'screenshot':
                if (this.state.commandInterface !== null)
                    this.state.commandInterface.screenshot().then((data) => {
                        console.log(data)
                    })
                break
            case 'stop':
                if (this.state.operation === this.internalState.playing)
                    this.stopDos()
                break
            case 'cycledown':
                if (this.state.commandInterface !== null) {
                    this.state.commandInterface.simulateKeyPress(17);
                    this.state.commandInterface.simulateKeyPress(122);
                }
                break
            case 'cycleup':
                    if (this.state.commandInterface !== null) {
                        this.state.commandInterface.simulateKeyPress(17);
                        this.state.commandInterface.simulateKeyPress(123);
                    }
                    break
            case 'fullscreen':
                if (this.state.operation === this.internalState.playing) {
                    this.state.commandInterface.api.requestFullScreen()
                }
                break
            default:
                break
        }
    }

    async stopDos() {
        await this.state.commandInterface.exit()
        this.setOperation({
            commandInterface: null,
            operation: this.internalState.stopping
        })
    }

    startDos(titleData) {
        
        let self = this

        this.setOperation({
            operation: this.internalState.downloading
        })

        window.Dos(this.refs.canvas, {
            cycles: 'auto',
            wdosboxUrl: "javascripts/wdosbox.js",
            log: (message) => {
                console.log(message);
            },
            onerror: (message) => {
                console.log(message);
            },
            onprogress: (stage, total, loaded) => {
                //console.log(stage, loaded * 100 / total + "%");
                let perc = parseInt(loaded * 100 / total, 10)
                self.setState({
                    percentage: perc
                })
            }
        }).ready((fs, main) => {

            this.setOperation({
                operation: this.internalState.extractingFolder
            })
            fs.extract('games/' + titleData.key + '/game.zip', '/' + titleData.installFolder).then(() => {
                self.extractSoundConfiguration(fs, titleData).then(() => {
                    self.extractCdImages(fs, titleData).then(() => {
                        self.buildConfFile(fs, titleData).then(() => {

                            main(["-conf", "dosbox.conf"]).then((ci) => {

                                self.setOperation({
                                    operation: self.internalState.resizeOnStart,
                                    percentage: 100,
                                    commandInterface: ci
                                })
                            })
                        })
                    })
                })
            })
      
        }).catch((message) => {
          console.log(message);
        })
    }

    extractCdImages = async (fs, titleData) => {

        let cdFile = 'cd.zip'

        if (titleData.exeSelection) {
            if (titleData.exeSelection.cdFile) {
                cdFile = titleData.exeSelection.cdFile
            }
            else {
                return //if exeSelection has no cd to download, leave
            }
        }

        try {
            this.setOperation({
                operation: this.internalState.exractingRoot
            })
            return await fs.extract('games/' + titleData.key + '/' + cdFile);
        }
        catch(e) {
            console.log('no root file to extract')
        }
    }

    extractSoundConfiguration = async (fs, titleData) => {
        
        switch (titleData.soundSelection) {
            case 'gus': 
                try {
                    return await fs.extract('sound/gus.zip', '/ultrasnd');
                }
                catch(e) {
                    console.log(e)
                }
                break
            default:
                break
        }
    }

    buildConfFile = async (fs, titleData) => {
        
        //these settings override defaults and are global

        let conf = `
        [mixer]
        blocksize=128
        prebuffer=5000
        [joystick]
        joysticktype=none
        [sdl]
        autolock=true
        `

        conf += SoundConfiguration[titleData.soundSelection].conf

        let autoexec = `
        [autoexec]
        @ECHO OFF
        cls
        mount c .
        c:
        `

        let titleAutoExec = titleData.autoexec.replace('{soundSelection}', titleData.soundSelection)

        if (titleData.exeSelection) {
            titleAutoExec = titleAutoExec.replace('{exeSelection}', titleData.exeSelection.id)
        }

        return await fs.createFile('dosbox.conf', conf + titleData.conf + autoexec + titleAutoExec)
    }

    handleWrapperTransitionEnd() {
        if (this.state.operation === this.internalState.resizeOnStart) {
            this.setOperation({
                operation: this.internalState.starting
            })
        }
        if (this.state.operation === this.internalState.resizeOnExit) {
            this.setOperation({
                operation: this.internalState.idle
            })
        }
    }

    handleCanvasTransitionEnd() {
        if (this.state.operation === this.internalState.stopping) {
            this.setOperation({
                operation: this.internalState.resizeOnExit
            })
        }
        if (this.state.operation === this.internalState.starting) {
            this.setOperation({
                operation: this.internalState.playing,
                percentage: 0
            })
        }
    }

    render() {

        console.log('render state: ' + this.state.operation)
        switch (this.state.operation) {
            case this.internalState.idle:
                this.resolutionClass = ''
                break
            case this.internalState.downloading:
                this.refs.dialogs.style.opacity = 1
                break
            case this.internalState.extractingFolder:
                this.refs.dialogs.style.opacity = 1
                break
            case this.internalState.exractingRoot:
                this.refs.dialogs.style.opacity = 1
                break
            case this.internalState.resizeOnStart:
                this.refs.dialogs.style.opacity = 0
                this.resolutionClass = `x${this.props.dosBoxResolution[0]}x${this.props.dosBoxResolution[1]}`
                this.refs.jsdos.style.height = this.props.dosBoxResolution[1] + 'px'
                break
            case this.internalState.starting:
                this.refs.dialogs.style.display = 'none'
                this.refs.canvas.style.opacity = 1
                if (this.props.activeTitle.canvasImageRendering !== null)
                {
                    this.refs.canvas.style['image-rendering'] = this.props.activeTitle.canvasImageRendering
                }

                break
            case this.internalState.playing:
                this.resolutionClass = `x${this.props.dosBoxResolution[0]}x${this.props.dosBoxResolution[1]}`
                this.refs.jsdos.style.height = this.props.dosBoxResolution[1] + 'px'
                break
            case this.internalState.stopping:
                this.refs.canvas.style.opacity = 0
                break
            case this.internalState.resizeOnExit:
                this.refs.dialogs.style.display = 'block'
                this.resolutionClass = ''
                this.refs.jsdos.style.height = ''
                break
            default:
            
        }

        return (
            <div ref='jsdos' className='jsdos' onTransitionEnd={this.handleWrapperTransitionEnd}>
                <div ref='dialogs' className='dialogs'>
                    {(  
                        //this.state.operation === this.internalState.idle || //for testing
                        this.state.operation === this.internalState.downloading || 
                        this.state.operation === this.internalState.extractingFolder ||
                        this.state.operation === this.internalState.exractingRoot ||
                        this.state.operation === this.internalState.resizeOnStart
                    ) && <Loading operation={this.state.operation} percentage={this.state.percentage} />}
                </div>
                <canvas ref='canvas' className={[this.resolutionClass,'jsdos-canvas'].join(' ')} onTransitionEnd={this.handleCanvasTransitionEnd} onContextMenu={(e) => { e.preventDefault() }}></canvas>
            </div>
        )
    }
}

export default JsDos;