import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'
import {TimelineLite, TweenLite, Power2} from 'gsap'
import {setColor, BLACK} from 'APP/Store/color/actions'
import {itWillPush, DID_PUSH} from 'APP/Store/navigation/actions'
import ShowRoom from './ShowRoom'
import Detail from './Detail'

class Project extends Component {
	constructor(props){
		super(props)

		this.state = {
			tl: null
		}
	}

	render() {
		const {kind} = this.props
		return (
			<div id="project" className="sub-wrapper" ref="container">
				<ShowRoom {...this.props} />
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { navigationReducer} = state

  const {
    routeKind: kind,
  } = navigationReducer

  return {
    kind
  }
}

export default connect(mapStateToProps)(withRouter(Project))