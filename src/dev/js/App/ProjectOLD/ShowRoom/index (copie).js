import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'
import {TimelineLite, TweenLite, Power2} from 'gsap'
import {setColor, BLACK} from 'APP/Store/color/actions'
import {itWillPush, DID_PUSH} from 'APP/Store/navigation/actions'

class ShowRoom extends Component {
	constructor(props){
		super(props)

		this.state = {
			readyForNext: false,
			reg: /^\/projects\/[a-zA-Z0-9]*$/,
			detailReg: /\/detail$/,
			tl: null
		}

		this.routerWillLeave = this.routerWillLeave.bind(this)
	}

	componentWillMount() {
		const {name} = this.props.params
		this.checkData(name)
		this.setState({tl: new TimelineLite()})
	}

	componentDidMount() {
		const {router, route} = this.props
		const {thumbnail} = this.refs
		const self = this
    router.setRouteLeaveHook(route, this.routerWillLeave)
		this.setColor()
		// this.enterAnimation()
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {location} = this.props
		const {readyForNext, reg} = this.state
		if ( ((nextProps.location != location) && reg.test(nextProps.location.pathname))
		|| (nextState.readyForNext != readyForNext)
		){
			return true
		} else {
			return false
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if ( this.props.location != nextProps.location ){
			this.state.readyForNext = false
		}
	}

	componentDidUpdate(prevProps, prevState) {
		this.setColor()
		if ( prevProps.location != this.props.location ){
			this.switchEnterAnimation()
		}
		console.log("UPDATE PROJECT")
	}

	componentWillUnmount() {
		this.setColor(BLACK)
		console.log("UNMOUNT PROJECT")
	}

	checkData(name){
		const {data, router} = this.props
		if ( typeof data.details[name] != "object"){
			router.push('/')
		}
	}

	handleClick(e){
		const {pathname} = this.props.location
    e.preventDefault()
    browserHistory.push(pathname+'/detail')
	}

	setColor(forceColor = null){
		const {dispatch, params} = this.props
		const {color} = this.props.data.details[params.name]
		let trueColor = color
		if (forceColor != null ){
			trueColor = forceColor
		}
		dispatch(setColor(trueColor))
	}



	routerWillLeave(nextLocation) {
    const {readyForNext, reg, detailReg} = this.state
    const {router, dispatch} = this.props
    if ( readyForNext ){
			return true
    } else if ( detailReg.test(nextLocation.pathname) ) {
			// dispatch(itWillPush(nextLocation.pathname))
			// this.detailLeaveAnimation(()=>{
			// 	this.setState({readyForNext: true})
			// 	router.push(nextLocation.pathname)
			// 	dispatch({ type: DID_PUSH })
			// })
			return false
    } else if ( reg.test(nextLocation.pathname) ) {
			// dispatch(itWillPush(nextLocation.pathname))
			// this.switchLeaveAnimation(nextLocation, ()=>{
			// 	this.setState({readyForNext: true})
			// 	router.push(nextLocation.pathname)
			// 	dispatch({ type: DID_PUSH })
			// })
			return false
		} else {
			// dispatch(itWillPush(nextLocation.pathname))
			// this.leaveAnimation(()=>{
			// 	this.setState({readyForNext: true})
			// 	router.push(nextLocation.pathname)
			// 	dispatch({ type: DID_PUSH })
			// })
			return false
		}
  }


	// !!!!!!!!!!!!!!!!
	// DETAIL LEAVING
	// !!!!!!!!!!!!!!!!


	detailLeaveAnimation(callback = null){
		const {tl} = this.state
    const {container} = this.refs
    const tweenBackground = new TweenLite.to(container, 4,
			{
				opacity: 0,
				ease: Power2.easeOut
			})
    tl.clear()
    tl.add([tweenBackground])
    if ( callback != null ){
      tl.add(callback)
    }
	}

	// !!!!!!!!!!!!!!!!
	// SWITCH PROJECT LEAVING
	// !!!!!!!!!!!!!!!!

	isGoingUp(next){
		const {data, params} = this.props
		const nextProject = next.pathname.substring(next.pathname.lastIndexOf('/') + 1)
		const actualIndex = data.details[params.name].index
		const nextIndex = data.details[nextProject].index
		if ( (actualIndex - nextIndex) > 0 ){
			// UP
			return true
		} else {
			// DOWN
			return false
		}
	}

	switchLeaveAnimation(next, callback = null){
		const {tl} = this.state
    const {title} = this.refs
    const up = this.isGoingUp(next)
    const tweenBackground = new TweenLite.to(title, 5,
			{
				opacity:0,
				ease: Power2.easeOut
			})
    tl.clear()
    tl.add([tweenBackground])
    if ( callback != null ){
      tl.add(callback)
    }
	}

	switchEnterAnimation(){
		const {tl} = this.state
    const {title} = this.refs
    const tweenBackground = new TweenLite.to(title, 5,
			{
				opacity:1,
				ease: Power2.easeOut
			})
    tl.clear()
    tl.add([tweenBackground])
	}

	// !!!!!!!!!!!!!!!!
	// NORMAL LEAVING
	// !!!!!!!!!!!!!!!!

  leaveAnimation(callback = null){
    const {tl} = this.state
    const {container} = this.refs
    const tweenContainer = new TweenLite.to(container, 1,
			{
				opacity:0,
				ease: Power2.easeOut
			})
    tl.clear()
    tl.add([tweenContainer])
    if ( callback != null ){
      tl.add(callback)
    }
  }

	enterAnimation(){
		const {tl} = this.state
		const {thumbnail, container} = this.refs
		const tweenThumbnail = new TweenLite.from(thumbnail, 3,
			{
				top: -100+"%",
				ease: Power2.easeOut
			})
		const tweenContainer = new TweenLite.from(container, 3,
			{
				opacity:0,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenThumbnail, tweenContainer])
	}




	render() {
		const {name} = this.props.params
		const {title, intro, backBlur, thumbnail, square, color} = this.props.data.details[name]
		return (
			<div className="content">
				<div className="main">
					<div className="title" ref="title">{title}</div>
				</div>
				<div className="intro">
					<span className="line">{intro.part1}</span>
					<span className="line">{intro.part2}</span>
					<div className="intro-hover"></div>
				</div>
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
    isRouting: isRouting
  } = navigationReducer

  return {
    data,
    reduxRoute,
    reduxNextRoute,
    isRouting
  }
}

export default connect(mapStateToProps)(withRouter(ShowRoom))