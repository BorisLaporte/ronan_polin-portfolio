import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'
import {TimelineLite, TweenLite, Power2} from 'gsap'
import {setColor, BLACK} from 'APP/Store/color/actions'
import {itWillPush, DID_PUSH} from 'APP/Store/navigation/actions'
import ShowRoom from './ShowRoom'
import Detail from './Detail'
import HoverColor from './hover_color'
import BackBlur from './ShowRoom/back_blur'
import Square from './ShowRoom/square'

class Project extends Component {
	constructor(props){
		super(props)

		this.state = {
			tl: null
		}
	}

	render() {
		const {name} = this.props.params
		const {kind} = this.props
		const {thumbnail, color, square} = this.props.data.details[name]
		return (
			<div id="project" className="sub-wrapper" ref="container">
				{(kind == "projects") && <BackBlur thumbnail={thumbnail} color={color} />}
				
				{(kind == "detail") ? <Detail {...this.props}/> : <ShowRoom/>}
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { contentReducer} = state
  const { navigationReducer} = state

  const {
    items: data
  } = contentReducer

  const {
    routeKind: kind,
  } = navigationReducer

  return {
    data,
    kind
  }
}

export default connect(mapStateToProps)(withRouter(Project))