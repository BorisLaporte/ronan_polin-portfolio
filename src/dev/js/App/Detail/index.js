import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'
import {TimelineLite, TweenLite, Power2} from 'gsap'
import {setColor, BLACK} from 'APP/Store/color/actions'
import {itWillPush, DID_PUSH} from 'APP/Store/navigation/actions'

import Body from './Body'
import Header from './Header'

class Detail extends Component {
	constructor(props){
		super(props)

		this.state = {
			readyForNext: false,
			timeout: null
		}

		this.routerWillLeave = this.routerWillLeave.bind(this)
	}

	componentDidMount() {
		const {router, route, comingFrom} = this.props
    if ( this.checkData() ){
      router.setRouteLeaveHook(route, this.routerWillLeave)
    //   if ( comingFrom == "projects"){
				// this.enteringAnim(true)
    //   } else {
				// this.enteringAnim(false)
    //   }
    }
	}

  // shouldComponentUpdate(nextProps, nextState) {
  //   const {reduxNextRoute, reduxRoute, nextRouteKind, isRouting}= this.props
  //   const {readyForNext}= this.state
  //   if ( !isRouting ){
  //     if ( 
  //       (nextProps.reduxNextRoute != reduxNextRoute)
  //       ||(readyForNext)
  //     ){
  //       return true
  //     }
  //   } else if (nextProps.reduxRoute != reduxRoute) {
  //     return true
  //   }
  //   return false
  // }

  componentDidUpdate(prevProps, prevState) {
		const {isRouting} = this.props
		// if ( isRouting ){
		// 	console.log("leaving")
		// } else {
		// 	console.log("entering")
		// 	// this.enteringAnim(false)
		// }
		console.log(prevProps)
		console.log(this.props)
		console.log("!!!!!!!!!!! DETAIL")
  }

	checkData(){
    const {params, data, router} = this.props
    if ( typeof data.details[params.name] != "object"){
      router.push('/')
      return false
    }
    return true
  }

	routerWillLeave(nextLocation) {
    const {readyForNext, timeout} = this.state
    const {dispatch} = this.props
    const self = this
    if ( readyForNext ){
      this.setState({readyForNext: false})
			return true
    } else {
			dispatch(itWillPush(nextLocation.pathname, "detail"))
			clearTimeout(timeout)
			const newTimeout = setTimeout(function() {
				self.setAndGo(nextLocation.pathname)
			}, 2000)
			this.setState({timeout: newTimeout})
			return false		// {
   //      opacity: 0
   //    },
		}
  }

	setAndGo(next){
    const {router, dispatch} = this.props
		this.setState({readyForNext: true})
		router.push(next)
		dispatch({ type: DID_PUSH })
		window.scrollTo(0, 0)
  }

 //  enteringAnim(fromProject = false){
	// 	const {tl} = this.state
	// 	const {main, hoverColor} = this.refs
	// 	window.scrollTo(0, 0)
	// 	tl.clear()
	// 	if ( !fromProject ){
	// 		const tweenMain = new TweenLite.fromTo(main, 1,
	// 			{
	// 				opacity:0
	// 			},
	// 			{
	// 				opacity:1,
	// 				ease: Power2.easeOut
	// 			})
	// 		tl.add([tweenMain], 0.1)
	// 	} else {
	// 		const tweenMain = new TweenLite.to(main, 1,
	// 			{
	// 				opacity:1,
	// 				ease: Power2.easeOut
	// 			})
	// 		tl.add([tweenMain], 0.1)
	// 	}
 //  }

 //  leavingAnim(callback = null){
	// 	const {tl} = this.state
	// 	const {main} = this.refs
	// 	const tweenMain = new TweenLite.to(main, 1,
	// 		{
	// 			opacity:0,
	// 			ease: Power2.easeOut
	// 		})
	// 	tl.clear()
	// 	tl.add([tweenMain], 0.2)
	// 	if ( callback != null ){
	// 		tl.add(callback)
	// 	}
	// }

	render() {
		const {params, data} = this.props
		const actualData = data.details[params.name]
		return (
			<div id="detail" className="sub-wrapper" ref="main">
				<Header data={actualData} />
				<Body data={actualData} />
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
    comingFrom: comingFrom
  } = navigationReducer

  return {
    data,
    reduxRoute,
    reduxNextRoute,
    isRouting,
    nextRouteKind,
    comingFrom
  }
}

export default connect(mapStateToProps)(withRouter(Detail))