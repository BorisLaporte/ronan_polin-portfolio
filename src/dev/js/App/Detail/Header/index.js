import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as ScrollMagic from 'scrollmagic'
import {setColor, BLACK} from 'APP/Store/color/actions'

import TitleIntro from './title_intro'
import HoverColor from './hover_color'

class Header extends Component {
	constructor(props){
		super(props)
		this.state = {
			scController: null,
			scScene: null
		}
	}

	componentWillMount() {
		this.setState({
			scController: new ScrollMagic.Controller()
		})
	}

	componentDidMount() {
		this.setScene()
	}

	setScene(){
		const {scController} = this.state
		const {data, dispatch} = this.props
		const {main} = this.refs
		const duration = main.clientHeight - 100
		const scene = new ScrollMagic.Scene({
				triggerElement: main,
				duration: duration,
				triggerHook: 0
			})
			.addTo(scController)
			.on("enter leave", function (e) {
				if (e.type == "enter" ){
					dispatch(setColor(data.color))
				} else {
					dispatch(setColor(BLACK))
				}
			})
		this.setState({scScene: scene})
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {isRouting, reduxRoute, reduxNextRoute} = this.props
		if (
				(!isRouting && nextProps.isRouting)
				|| (reduxRoute != nextProps.reduxRoute)
		){
			return true
		}
		return false
	}

	componentDidUpdate(prevProps, prevState) {
		const {isRouting} = this.props
		const {scScene} = this.state
		if ( isRouting ){
			scScene.destroy()
		} else {
			this.setScene()
		}
	}

	componentWillUnmount() {
		const {dispatch} = this.props
		dispatch(setColor(BLACK))
	}

  isChanging(){
		const {isRouting, nextKind, comingFrom} = this.props
		if ( isRouting ){
			return {
				type: "leaving",
				where: nextKind,
				comingFrom: comingFrom
			}
		} else {
			return {
				type: "entering",
				where: nextKind,
				comingFrom: comingFrom
			}
		}
	}

	render() {
		const {title, intro, thumbnail, color} = this.props.data
		const event = this.isChanging()
		return (
			<div className="header" ref="main">
				<HoverColor event={event} thumbnail={thumbnail} />
				<TitleIntro event={event} title={title} intro={intro} color={color} />
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { navigationReducer} = state

  const {
    route: reduxRoute,
    routeKind: kind,
    nextRoute: reduxNextRoute,
    nextRouteKind: nextKind,
    isRouting: isRouting,
    comingFrom: comingFrom
  } = navigationReducer

  return {
    reduxRoute,
    kind,
    reduxNextRoute,
    isRouting,
    nextKind,
    comingFrom
  }
}

export default connect(mapStateToProps)(Header)