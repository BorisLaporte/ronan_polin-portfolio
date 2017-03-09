import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import Top from './Top'
import Bottom from './Bottom'

class Menu extends Component {
	constructor(props){
		super(props)

		this.state = {
			reg: {
				home: /^\/home$/,
				about: /^\/about$/,
				projects: /^\/projects/,
				detail: /detail$/
			}
		}
	}

	componentDidMount() {
		// setTimeout(function() {
		// 	browserHistory.push('/')
		// }, 3000)
		// console.log(this.props)

	}

	componentDidUpdate(prevProps, prevState) {

	}


	render() {
		const {reg} = this.state
		return (
			<div id="menu" >
				<Top reg={reg}/>
				<Bottom reg={reg}/>
			</div>
		)
	}
}

export default withRouter(Menu)
