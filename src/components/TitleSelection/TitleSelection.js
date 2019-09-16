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

        const titles = TitleData.map(titleData => 
            <TitleTile 
                key={titleData.key}
                data={titleData}
                loadTitle={this.props.loadTitle}
            />
        );

        return (
            <div className='titleSelection'>
                {titles}
            </div>
        )
    }
}

export default TitleSelection