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

  handleBlur(e) {
    if (e.target.value.length === 0)
      e.target.value = 'Search'
  }

  render() {
    return (
      <div className='search'>
        <input ref='input' type='input' defaultValue='Search' onFocus={this.handleFocus} onBlur={this.handleBlur} />
      </div>
    )
  }
}

export default Search