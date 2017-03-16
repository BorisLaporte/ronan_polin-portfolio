import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

import About from './about'
import Home from './home'
import Project from './project'

class Top extends Component {
	render() {
		const {kind} = this.props
		const extraClass = (kind == "detail") && "pair"
		return (
			<div className={"top parts "+ extraClass} >
				{ (kind == "detail") && <Project/> }
				{ (kind == "about") ? <Home /> : <About /> }
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { navigationReducer} = state

  const {
    routeKind: kind
  } = navigationReducer

  return {
    kind
  }
}


export default connect(mapStateToProps)(Top)
