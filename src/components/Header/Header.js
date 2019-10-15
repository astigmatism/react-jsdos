import React from 'react'
import './Header.css'

class Header extends React.Component {

    handleFocus(e) {
        e.target.value = ''
      }
    
    handleBlur(e) {
    if (e.target.value.length === 0)
        e.target.value = 'Search'
    }

    render() {
        return (
            <div className='header'>
                <div className='titleWrapper'>
                    <h1>ms<span className='d'>d</span><span className='o'>o</span><span className='s'>s</span>.games</h1>
                </div>
                <div className='search'>
                    <input ref='input' type='input' defaultValue='Search' onFocus={this.handleFocus} onBlur={this.handleBlur} />
                </div>
            </div>
        )
    }
}

export default Header