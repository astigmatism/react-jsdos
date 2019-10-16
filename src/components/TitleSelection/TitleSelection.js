import React from 'react'
import './TitleSelection.css'
import TitleData from './TitleData'
import TitleTile from './TitleTile/TitleTile'
//import ShuffleArray from '../Utility/ShuffleArray'

class TitleSelection extends React.Component {

    componentDidMount() {
        
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {

        /*
        //alphabetize
        TitleData.sort((a, b) => {
            return ('' + a.title).localeCompare(b.title);
        })
        */

        let filtered = TitleData.filter((item) => {
            return !item.hidden            
        })

        //filtered = ShuffleArray(filtered)

        const buckets = [[], [], [], [], [], []]
        for (let i = 0; i < filtered.length; ++i) {
            buckets[i % buckets.length].push(
                <TitleTile 
                    key={filtered[i].key}
                    data={filtered[i]}
                    loadTitle={this.props.loadTitle}
                    iteration={i}
                />

            )
        }

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