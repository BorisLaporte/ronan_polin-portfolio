import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import Projects from './projects'
import Next from './next'


class Bottom extends Component {
	constructor(props){
		super(props)

		this.state = {
			index: 0
		}
	}

	render() {
		const {pathname} = this.props.location
		const {detail} = this.props.reg
		return (
			<div className="bottom parts" >
				{ detail.test(pathname) ? <Next /> : <Projects /> }
			</div>
		)
	}
}

export default withRouter(Bottom)
