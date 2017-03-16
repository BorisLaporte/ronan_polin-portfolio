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
			reg: /^\/projects\/[a-zA-Z0-9]*\/?$/,
			detailReg: /\/detail$/,
			prefix: '/projects/',
			isScrolling: false,
			tl: null
		}

		this.routerWillLeave = this.routerWillLeave.bind(this)
		this.onScroll = this.onScroll.bind(this)
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
		window.addEventListener('wheel', this.onScroll)
		// this.enterAnimation()
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log("should update")
		const {readyForNext} = this.state
		const {reduxRoute, reduxNextRoute} = this.props
		if ( 
			( nextProps.isRouting && nextProps.reduxNextRoute != reduxNextRoute )
			|| ( !nextProps.isRouting && nextProps.reduxRoute != reduxRoute )
			|| readyForNext
		){
			return true
		}
		return false
	}

	componentWillUpdate(nextProps, nextState) {
		if ( this.props.location != nextProps.location ){
			this.state.readyForNext = false
		}
	}

	componentDidUpdate(prevProps, prevState) {
		console.log("update")
		this.setColor()
		if ( prevProps.location != this.props.location ){
			this.switchEnterAnimation()
		}
	}

	componentWillUnmount() {
		this.setColor(BLACK)
		window.removeEventListener('wheel', this.onScroll)
	}


	onScroll(e){
		e.preventDefault()
		const {deltaY} = e
		const {kind} = this.props
		const {isScrolling} = this.state
		if ( deltaY >= 30 && kind != "detail" && !isScrolling){
			this.scrollToNext(1)
		} else if ( deltaY <= -30 && kind != "detail" && !isScrolling){
			this.scrollToNext(-1)
		}
	}

	scrollToNext(direction){
		const {location, kind, params, data} = this.props
		const {prefix} = this.state

		let nextIndex = data.details[params.name].index + direction
		if ( nextIndex < 0 ){
			nextIndex = data.projects.length - 1
		} else if (nextIndex >= data.projects.length){
			nextIndex = 0
		}

		const nextProject = data.projects[nextIndex]
		browserHistory.push(prefix+nextProject)
		this.setState({isScrolling: true})
		const self = this
		setTimeout(function() {
			self.setState({isScrolling: false})
		}, 1000)
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
    const {dispatch} = this.props
    if ( readyForNext ){
			return true
    } else if ( detailReg.test(nextLocation.pathname) ) {
			dispatch(itWillPush(nextLocation.pathname))
			this.detailLeaveAnimation(()=>{
				this.setAndGo(nextLocation)
			})
			return false
    } else if ( reg.test(nextLocation.pathname) ) {
			const direction = this.isGoingUp(nextLocation.pathname)
			dispatch(itWillPush(nextLocation.pathname, direction))
			this.switchLeaveAnimation(nextLocation, ()=>{
				this.setAndGo(nextLocation)
			}, direction)
			return false
		} else {
			dispatch(itWillPush(nextLocation.pathname))
			this.leaveAnimation(()=>{
				this.setAndGo(nextLocation)
			})
			return false
		}
  }


  setAndGo(next){
    const {router, dispatch} = this.props
  	this.setState({readyForNext: true})
		router.push(next.pathname)
		dispatch({ type: DID_PUSH })
  }
	// !!!!!!!!!!!!!!!!
	// DETAIL LEAVING
	// !!!!!!!!!!!!!!!!

	detailEnterAnimation(){
		const {tl} = this.state
    const {container} = this.refs
    const tweenContainer = new TweenLite.to(container, 2,
			{
				opacity: 1,
				ease: Power2.easeOut
			})
    tl.clear()
    tl.add([tweenContainer])
	}

	detailLeaveAnimation(callback = null){
		const {tl} = this.state
    const {container} = this.refs
    const tweenContainer = new TweenLite.to(container, 2,
			{
				opacity: 0,
				ease: Power2.easeOut
			})
    tl.clear()
    tl.add([tweenContainer])
    if ( callback != null ){
      tl.add(callback)
    }
	}

	// !!!!!!!!!!!!!!!!
	// SWITCH PROJECT LEAVING
	// !!!!!!!!!!!!!!!!

	isGoingUp(next){
		const {data, params} = this.props
		const nextProject = next.substring(next.lastIndexOf('/') + 1)
		const actualIndex = data.details[params.name].index
		const nextIndex = data.details[nextProject].index
		if ( (actualIndex - nextIndex) > 0 ){
			// UP
			return 1
		} else {
			// DOWN
			return -1
		}
	}

	switchLeaveAnimation(next, callback = null, direction){
		const {tl} = this.state
    const {title} = this.refs
    const factor = 30 * direction
    const tweenTitle = new TweenLite.to(title, 2,
			{
				y: factor,
				ease: Power2.easeOut
			})
    tl.clear()
    tl.add([tweenTitle])
    if ( callback != null ){
      tl.add(callback)
    }
	}

	switchEnterAnimation(){
		const {tl} = this.state
    const {title} = this.refs
    const {routeDirection} = this.props
    const tweenTitle = new TweenLite.to(title, 2,
			{
				y: 0,
				ease: Power2.easeOut
			})
    tl.clear()
    tl.add([tweenTitle])
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
		const {container} = this.refs
		const tweenContainer = new TweenLite.from(container, 2,
			{
				opacity:0,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenContainer])
	}




	render() {
		const {name} = this.props.params
		const {title, intro, backBlur, thumbnail, square} = this.props.data.details[name]
		return (
			<div className="content" ref="container">
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