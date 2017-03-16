import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'
import {TimelineLite, TweenLite, Power2} from 'gsap'
import {setColor, BLACK} from 'APP/Store/color/actions'
import {itWillPush, DID_PUSH} from 'APP/Store/navigation/actions'


class Detail extends Component {
	constructor(props){
		super(props)

		this.state = {
			readyForNext: false,
			projectsReg: /^\/projects\/[a-zA-Z0-9]*$/,
			reg: /\/detail$/
		}

		// this.routerWillLeave = this.routerWillLeave.bind(this)
	}

	// componentDidMount() {
	// 	const {router, route} = this.props
 //    router.setRouteLeaveHook(route, this.routerWillLeave)
	// }

	// componentDidUpdate(prevProps, prevState) {
	
	// }

	// setAndGo(next){
 //    const {router, dispatch} = this.props
	// 	this.setState({readyForNext: true})
	// 	router.push(next)
	// 	dispatch({ type: DID_PUSH })
 //  }


	// routerWillLeave(nextLocation) {
 //    const {readyForNext, reg, projectsReg} = this.state
 //    const {dispatch} = this.props
 //    if ( readyForNext ){
	// 		return true
 //    } else if ( reg.test(nextLocation.pathname) ) {
	// 		dispatch(itWillPush(nextLocation.pathname))
	// 		// this.detailLeaveAnimation(()=>{
	// 			this.setAndGo(nextLocation.pathname)
	// 		// })
	// 		return false
 //    } else if ( projectsReg.test(nextLocation.pathname) ) {
	// 		dispatch(itWillPush(nextLocation.pathname))
	// 		// this.switchLeaveAnimation(nextLocation, ()=>{
	// 			this.setAndGo(nextLocation.pathname)
	// 		// }, direction)
	// 		return false
	// 	} else {
	// 		dispatch(itWillPush(nextLocation.pathname))
	// 		// this.leaveAnimation(()=>{
	// 			this.setAndGo(nextLocation.pathname)
	// 		// })
	// 		return false
	// 	}
 //  }


	render() {
		const {data, params} = this.props
		const thumbnail = data.details[params.name].thumbnail
		return (
			<div className="hover-color">
				<div ref="thumbnail" className="thumbnail detail" >
					<img ref="colorImg" src={require("IMG/"+thumbnail)} alt=""/>
				</div>
			</div>
		)
	}
}


function mapStateToProps(state) {
  const { contentReducer} = state

  const {
    items: data
  } = contentReducer

  return {
    data
  }
}


export default connect(mapStateToProps)(withRouter(Detail))