import React from 'react';
import './Tools.css';
import { Button } from 'reactstrap';
import ResolutionDropdown from './ResolutionDropdown'

class Tools extends React.Component {

    constructor(props) {
        super(props)

        this.handleDownloadFile = this.handleDownloadFile.bind(this)
    }

    handleDownloadFile(e) {

        if (this.props.activeTitle === null)
            return

        let key = '/' + this.props.activeTitle.bfolder
        let file = this.refs.filepath.value
        let request = window.indexedDB.open(key)
        let db = null

        console.log('attempting to download file: ' + file)

        request.onsuccess = (event) => {
            db = request.result
            let transaction = db.transaction(['FILE_DATA'], 'readonly')
            let objectStore = transaction.objectStore('FILE_DATA')
            let getRequest = objectStore.get(file)
            getRequest.onsuccess = (event) => {
                console.log(event.currentTarget.result)
                

                let downloadBlob = function(data, fileName, mimeType) {
                    var blob, url
                    blob = new Blob([data], {
                      type: mimeType
                    })
                    url = window.URL.createObjectURL(blob)
                    downloadURL(url, fileName)
                    setTimeout(function() {
                      return window.URL.revokeObjectURL(url)
                    }, 1000)
                }
                  
                let downloadURL = function(data, fileName) {
                    var a
                    a = document.createElement('a')
                    a.href = data
                    a.download = fileName
                    document.body.appendChild(a)
                    a.style = 'display: none'
                    a.click()
                    a.remove()
                }

                downloadBlob(event.currentTarget.result.contents, this.refs.filepath.value, 'application/octet-stream');
            }
        }
    }

    render() {

        return (
            <div>
                <ul className='dostools-ul'>
                    <li>
                        <ResolutionDropdown handleResolutionChange={this.props.handleResolutionChange}></ResolutionDropdown>
                    </li>
                    <li>
                        <Button onClick={() => this.props.dosBoxCommand('stop')} color="danger">Stop Game</Button>{' '}
                    </li>
                    <li>
                        <Button onClick={() => this.props.dosBoxCommand('fullscreen')} color="primary">Fullscreen</Button>{' '}
                    </li>
                    <li>
                        <Button onClick={() => this.props.dosBoxCommand('screenshot')} color="info">Take Screenshot</Button>{' '}
                    </li>
                    <li>
                        <Button onClick={() => this.props.dosBoxCommand('cycledown')} color="warning">Decrease CPU Speed</Button>{' '}
                    </li>
                    <li>
                        <Button onClick={() => this.props.dosBoxCommand('cycleup')} color="success">Increase CPU Speed</Button>{' '}
                    </li>
                </ul>
                <div>
                    <input ref='filepath' /><button onClick={this.handleDownloadFile}>Download</button>
                </div>
            </div>
        )
    }

}

export default Tools;
