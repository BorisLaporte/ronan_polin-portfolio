import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

import Projects from './projects'
import Next from './next'


class Bottom extends Component {
	render() {
		const {kind} = this.props
		return (
			<div className="bottom parts" >
				{ kind == "detail" ? <Next /> : <Projects /> }
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { navigationReducer} = state

  const {
    routeKind: kind,
    nextRouteKind: nextKind
  } = navigationReducer

  return {
    kind,
    nextKind
  }
}


export default connect(mapStateToProps)(Bottom)
