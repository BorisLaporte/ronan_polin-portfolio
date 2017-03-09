import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import About from './about'
import Home from './home'
import Project from './project'

class Top extends Component {
	render() {
		const {pathname} = this.props.location
		const {about,detail} = this.props.reg
		const extraClass = detail.test(pathname) && "pair"
		return (
			<div className={"top parts "+ extraClass} >
				{ detail.test(pathname) && <Project/> }
				{ about.test(pathname) ? <Home /> : <About /> }
			</div>
		)
	}
}


export default withRouter(Top)
