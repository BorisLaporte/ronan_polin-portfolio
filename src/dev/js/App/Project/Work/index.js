import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'

import {setColor} from 'APP/Store/color/actions'
import BackBlur from './back_blur'
import Content from './content'
import HoverColor from './hover_color'
import Square from './square'

class Work extends Component {
	constructor(props){
		super(props)

		this.state = {
		}
	}

	componentWillMount() {
		const {data, params} = this.props
		if ( data.title == params.name ){
			this.setColor()
		}
	}

	componentDidMount() {
		console.log("mount")
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {data, isRouting, reduxRoute, reduxNextRoute} = this.props
		if (
				(!isRouting && nextProps.isRouting)
				|| (reduxRoute != nextProps.reduxRoute)
		){
			return true
		}
		return false
	}

	componentDidUpdate(prevProps, prevState) {
		const {reduxNextRoute, isRouting, nextKind} = this.props
		this.setColor()
		if ( !isRouting ){
			// console.log("entering")
		} else {
			// console.log("leaving")
		}
	}

	getNamePath(path){
		return path.substring(path.lastIndexOf('/') + 1)
	}

	setColor(){
		const {data, dispatch, color} = this.props
		if ( color != data.color ){
			dispatch(setColor(data.color))
		}
	}

	isChanging(){
		const {isRouting, nextKind, direction} = this.props
		if ( isRouting ){
			return {
				type: "leaving",
				where: nextKind,
				direction: direction
			}
		} else {
			return {
				type: "entering",
				where: nextKind,
				direction: direction
			}
		}
	}

	render() {
		const {data, params, projectsSize} = this.props
		const event = this.isChanging()
		return (
			<div className={"fullscreen "+data.color} ref="main">
				<BackBlur 
					img={data.backBlur} 
					event={event}
				/>
			
				<HoverColor
					thumbnail={data.thumbnail}
					event={event}
				/>
				<Content 
					data={data} 
					event={event}
				/>
			</div>
		)
	}
}


function mapStateToProps(state) {
  const { navigationReducer} = state
  const { colorReducer} = state

  const {
    route: reduxRoute,
    nextRoute: reduxNextRoute,
    nextRouteKind: nextKind,
    isRouting: isRouting,
    direction: direction
  } = navigationReducer

  const {
		color: color
  } = colorReducer

  return {
    reduxRoute,
    reduxNextRoute,
    isRouting,
    nextKind,
    direction,
    color
  }
}

export default connect(mapStateToProps)(withRouter(Work))