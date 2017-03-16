import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'

import BackBlur from './back_blur'
import Content from './content'
import HoverColor from './hover_color'
import {setColor} from 'APP/Store/color/actions'

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
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {data, isRouting, reduxRoute, reduxNextRoute} = this.props
		if ( 
			(data.title == this.getNamePath(reduxNextRoute))
			&& (
				(!isRouting && nextProps.isRouting)
				|| (reduxRoute != nextProps.reduxRoute)
			)
		){
			return true
		}
		return false
	}

	componentDidUpdate(prevProps, prevState) {
		const {reduxNextRoute, isRouting, nextKind} = this.props
		this.setColor()
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

	isLeaving(){
		const {isRouting, nextKind} = this.props
		if ( isRouting ){
			return nextKind
		}
		return null
	}

	render() {
		const {data, params	} = this.props
		const onFocus = (data.title == params.name ? true : false)
		const leaving = this.isLeaving()
		return (
			<div className={"section "+data.color} ref="main">
				<BackBlur 
					img={data.thumbnail} 
					leaving={leaving}
					onFocus={onFocus}
				/>
				<HoverColor
					thumbnail={data.thumbnail}
					leaving={leaving}
					onFocus={onFocus}
				/>
				<Content 
					data={data} 
					leaving={leaving}
					onFocus={onFocus}
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
    isRouting: isRouting
  } = navigationReducer

  const {
		color: color
  } = colorReducer

  return {
    reduxRoute,
    reduxNextRoute,
    isRouting,
    nextKind,
    color
  }
}

export default connect(mapStateToProps)(withRouter(Work))