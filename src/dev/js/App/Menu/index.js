import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

import Top from './Top'
import Bottom from './Bottom'

class Menu extends Component {
	render() {
		const {color} = this.props
		return (
			<div id="menu" className={color} >
				<Top/>
				<Bottom/>
			</div>
		)
	}
}


function mapStateToProps(state) {
  const { colorReducer} = state

  const {
    color: color
  } = colorReducer

  return {
    color
  }
}


export default connect(mapStateToProps)(Menu)
