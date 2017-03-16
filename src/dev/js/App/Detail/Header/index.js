import React, { Component } from 'react'
import {connect} from 'react-redux'
import TitleIntro from './title_intro'
import HoverColor from './hover_color'

class Header extends Component {

	// shouldComponentUpdate(nextProps, nextState) {
 //    const {reduxNextRoute, kind, reduxRoute, isRouting, nextRouteKind}= this.props
 //    // if ( (kind == "detail" && nextProps.isRouting)
 //    //   || nextRouteKind != nextProps.nextRouteKind )
 //    // {
 //    //   return true
 //    // } 
    
 //    return false
 //  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps)
    console.log(this.props)
    console.log("!!!!!!!!!!! HEADER")
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
    // console.log(event)
		return (
			<div className="header">
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