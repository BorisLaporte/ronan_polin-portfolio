import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'
import Work from './Work'

class ShowRoom extends Component {
	render() {
		const {projects, details} = this.props.data
		console.log(details)
		return (
			<div>
				{ projects.map(function(object,i){
					return <Work key={i} data={details[object]} />
				}) }
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
    route: reduxRoute,
    nextRoute: reduxNextRoute,
    nextRouteKind: nextRouteKind,
    isRouting: isRouting,
    routeDirection: routeDirection
  } = navigationReducer

  return {
    data,
    reduxRoute,
    reduxNextRoute,
    routeDirection,
    isRouting,
    nextRouteKind
  }
}

export default connect(mapStateToProps)(withRouter(ShowRoom))