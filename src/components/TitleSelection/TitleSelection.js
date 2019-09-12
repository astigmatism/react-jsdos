import React from 'react'
import './TitleSelection.css'
import TitleData from './TitleData'
import TitleTile from './TitleTile/TitleTile'
import Isotope from 'isotope-layout'

class TitleSelection extends React.Component {

    constructor(props) {
        super(props)

        this.iso = null

        //helpful https://developers.redhat.com/blog/2016/01/07/react-js-with-isotope-and-flux/
        this.isoOptions = {
            layoutMode: 'masonry',
            masonry: {
                
            }
        };
    }

    componentDidUpdate() {
        
    }

    componentDidMount() {
        this.createIsotopeContainer()
    }

    createIsotopeContainer() {
        if (this.iso === null)
            this.iso = new Isotope(this.refs.isotopeContainer)
    }

    render() {

        const titles = TitleData.map(titleData => 
            <TitleTile 
                data={titleData}
                loadTitle={this.props.loadTitle}
            />
        );

        return (
            <div ref='isotopeContainer' className='titleSelection'>
                {titles}
            </div>
        )
    }
}

export default TitleSelection