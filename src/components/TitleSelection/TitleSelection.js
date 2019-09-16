import React from 'react'
import './TitleSelection.css'
import TitleData from './TitleData'
import TitleTile from './TitleTile/TitleTile'

class TitleSelection extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        
    }

    render() {

        const buckets = [[], [], [], [], [], []]
        for (let i = 0; i < TitleData.length; ++i) {
            buckets[i % buckets.length].push(
                <TitleTile 
                    key={TitleData[i].key}
                    data={TitleData[i]}
                    loadTitle={this.props.loadTitle}
                />

            )
        }

        console.log(buckets)

        return (
            <div className='titleSelection'>
                <ul>{buckets[0]}</ul>
                <ul>{buckets[1]}</ul>
                <ul>{buckets[2]}</ul>
                <ul>{buckets[3]}</ul>
                <ul>{buckets[4]}</ul>
                <ul>{buckets[5]}</ul>
            </div>
        )
    }
}

export default TitleSelection