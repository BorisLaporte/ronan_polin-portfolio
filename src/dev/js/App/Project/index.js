import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'
import {TimelineLite, TweenLite, Power2} from 'gsap'
import {setColor, BLACK} from 'APP/Store/color/actions'
import {itWillPush, DID_PUSH} from 'APP/Store/navigation/actions'


class Project extends Component {
	constructor(props){
		super(props)

		this.state = {
			readyForNext: false,
			reg: /^\/projects/,
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
    router.setRouteLeaveHook(route, this.routerWillLeave)
		this.setColor()
		this.enterAnimation()
	}

	componentDidUpdate(prevProps, prevState) {
		this.setColor()
		console.log("update")
	}

	componentWillUnmount() {
		this.setColor(BLACK)
	}

	routerWillLeave(nextLocation) {
    const {readyForNext, reg} = this.state
    const {router, dispatch} = this.props
    if ( readyForNext ){
			return true
    } else if ( !reg.test(nextLocation.pathname) ) {
			dispatch(itWillPush(nextLocation.pathname))
			this.leaveAnimation(()=>{
				this.setState({readyForNext: true})
				router.push(nextLocation.pathname)
				dispatch({ type: DID_PUSH })
			})
			return false
		} else {
			dispatch(itWillPush(nextLocation.pathname))
			this.switchLeaveAnimation(()=>{
				this.setState({readyForNext: true})
				router.push(nextLocation.pathname)
				dispatch({ type: DID_PUSH })
			})
			return false
		}
  }

	checkData(name){
		const {data, router} = this.props
		if ( typeof data.details[name] != "object"){
			router.push('/')
		}
	}

	switchLeaveAnimation(callback = null){
		const {tl} = this.state
    const {background, square} = this.refs
    const tweenBackground = new TweenLite.to(background, 1,
			{
				opacity:0,
				ease: Power2.easeOut
			})
    const tweenSquare = new TweenLite.set(square,
			{
				class:'square middle',
			})
    tl.add([tweenBackground, tweenSquare]).pause()
    if ( callback != null ){
      tl.add(callback)
    }
    tl.play()
	}

	switchEnterAnimation(callback = null){
		const {tl} = this.state
    const {container} = this.refs
    const tweenContainer = new TweenLite.to(container, 1,
			{
				opacity:0.5,
				ease: Power2.easeOut
			})
    tl.add([tweenContainer]).pause()
    if ( callback != null ){
      tl.add(callback)
    }
    tl.play()
	}

  leaveAnimation(callback = null){
    const {tl} = this.state
    const {container} = this.refs
    const tweenContainer = new TweenLite.to(container, 1,
			{
				opacity:0,
				ease: Power2.easeOut
			})
    tl.add([tweenContainer]).pause()
    if ( callback != null ){
      tl.add(callback)
    }
    tl.play()
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
		tl.pause()
		tl.add([tweenThumbnail, tweenContainer])
		tl.play()
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


	render() {
		const {name} = this.props.params
		const {title, intro, backBlur, thumbnail, square, color} = this.props.data.details[name]
		return (
			<div id="project" className="sub-wrapper" ref="container">
			<div className={"back back-blur "+color} ref="background" style={{backgroundImage: 'url('+require(	"IMG/"+thumbnail)+')' }}>
			</div>
			<div className="back back-thumbnail">
				<div className="media-content">
					<div ref="square" className={"square "+square}></div>
					<a href="#" className="thumbnail" ref="thumbnail" >
						<div className="back back-color" style={{backgroundImage: 'url('+require(	"IMG/"+thumbnail)+')' }}></div>
						<div className="see-more">.see-more</div>
					</a>
				</div>
			</div>
				<div className="content">
					<div className="main">
						<div className="title" ref="title">{title}</div>
					</div>
					<div className="intro">
						<span className="what">{intro.part1}</span>
						<span className="what-again">{intro.part2}</span>
						<div className="intro-hover"></div>
					</div>
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

export default connect(mapStateToProps)(withRouter(Project))