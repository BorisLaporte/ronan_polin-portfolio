import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'

import {setColor} from 'APP/Store/color/actions'
import BackBlur from './back_blur'
import Content from './content'
import HoverColor from './hover_color'
import Square from './Square'

class Work extends Component {
	constructor(props){
		super(props)

		this.state = {
		}
	}

	componentWillMount() {
		const {data, actual,params} = this.props
		if ( data[actual].title == params.name ){
			this.setColor()
		}
	}

	componentDidMount() {
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {isRouting, reduxRoute, kind} = this.props
		if (
				(!isRouting && nextProps.isRouting)
				|| (reduxRoute != nextProps.reduxRoute && kind=="projects")
		){
			return true
		}
		return false
	}

	componentDidUpdate(prevProps, prevState) {
		const {reduxNextRoute, isRouting, nextKind} = this.props
		this.setColor()
		// console.log(this.props)
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
		const {data, actual, dispatch, color} = this.props
		if ( color != data[actual].color ){
			dispatch(setColor(data[actual].color))
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

	nextData(){
		const {next, data} = this.props
		if ( next != null ){
			return {
				nextBackBlur: data[next].backBlur,
				nextThumbnail: data[next].thumbnail,
				nextData: data[next]
			}
		} else {
			return {
				nextBackBlur: null,
				nextThumbnail: null,
				nextData: null
			}
		}
	}

	render() {
		const {data, actual, next, params, projects} = this.props
		const {nextBackBlur, nextThumbnail, nextData} = this.nextData()
		const event = this.isChanging()
		return (
			<div className={"fullscreen "+data[actual].color} ref="main">
				<BackBlur 
					img={data[actual].backBlur} 
					event={event}
					next={nextBackBlur}
				/>
				<Square 
					data={data}
					projects={projects}
					event={event}
					actual={actual}
					next={next}
				/>
				<HoverColor
					data={data[actual]}
					event={event}
					next={nextData}
				/>
				<Content 
					data={data[actual]} 
					event={event}
					next={nextData}
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
    routeKind: kind,
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
    kind,
    direction,
    color
  }
}

export default connect(mapStateToProps)(withRouter(Work))