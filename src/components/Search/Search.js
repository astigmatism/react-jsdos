import React from 'react'
import './Search.css'
import { thisExpression } from '@babel/types'

class Search extends React.Component {

  constructor(props) {
    super(props)
  }

  handleFocus(e) {
    e.target.value = ''
  }

  render() {
    return (
      <div className='search'>
        <input ref='input' type='input' defaultValue='Search' onFocus={this.handleFocus} />
      </div>
    )
  }
}

export default Search