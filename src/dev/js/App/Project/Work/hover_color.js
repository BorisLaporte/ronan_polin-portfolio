import React, { Component } from 'react'
import {TimelineLite, TweenLite, Power2} from 'gsap'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'
import Hammer from 'hammerjs'
import {PORTRAIT, LANDSCAPE} from 'APP/Store/responsive/actions'

class HoverColor extends Component {
	constructor(props){
		super(props)

		this.state = {
			tl: null,
			didEnter: false,
			isDragging: false,
			prefix: "/projects/",
			defaultPos: {
				xPos: 0,
				yPos: 0
			},
			mouse: {
				mouseX: 0,
				mouseY: 0
			}
		}

		this.handleClick = this.handleClick.bind(this)
		this.thumbnailSetPos = this.thumbnailSetPos.bind(this)
		this.thumbnailGoTo = this.thumbnailGoTo.bind(this)
	}

	componentWillMount() {
		this.setState({tl: new TimelineLite()})
	}

	componentDidMount() {
		this.update()
		this.initHammer()
		this.disableNativeDragAndDrop()
	}

	disableNativeDragAndDrop(){
		document.addEventListener('dragstart', function(e){
			e.preventDefault()
			return false
		})
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {event, thumbnail, rWidth, orientation} = this.props
		const {defaultPos} = this.state
		if ( 
			nextProps.event != event 
			|| thumbnail != nextProps.thumbnail
			|| defaultPos != nextState.defaultPos
			|| rWidth != nextProps.rWidth
			|| orientation != nextProps.orientation
		){
			return true
		}
		return false
	}

	componentDidUpdate(prevProps, prevState) {
		const {event, rWidth, orientation} = this.props
		const {didEnter, defaultPos} = this.state
		if ( prevProps.event != event ){
			this.handleAnimations()
		} else if (
			rWidth != prevProps.rWidth 
			|| orientation != prevProps.orientation
		) {
			this.update()
		} else if (defaultPos != prevState.defaultPos 
			&& 
			!didEnter
			) {
			this.enterAnim(false, 1)
			this.setState({didEnter: true})
		}
		// }
	}

	handleAnimations(){
		const {type, where, direction} = this.props.event
		const {didEnter} = this.state
		if ( type == "leaving" ){
			switch(where){
				case "projects":
					this.leavingAnim(direction)
					break
				case "detail":
					this.leavingAnimDetail()
					break
				default:
					this.leavingAnim(direction)
					break
			}
		} else if ( type == "entering" ){
			switch(where){
				case "projects":
					this.enterAnim(didEnter, direction)
					break
				case "detail":
					this.enterAnim(didEnter, direction)
					break
				default:
					this.enterAnim(didEnter, direction)
					break
			}
		}
	}

	componentWillUnmount() {
		this.reset()
	}

	update(){
		const {tl} = this.state
		const {thumbnail} = this.refs
		const {thumbnailSize} = this.props
		const {xPos, yPos} = this.thumbnailDefaultPos()
		this.thumbnailSetPos(xPos, yPos)
		this.thumbnailSetSize(thumbnailSize)
		this.setState({defaultPos: {xPos: xPos, yPos: yPos}})
	}

	reset(){
		const {thumbnail} = this.refs
	}

	initHammer(){
		const self = this
		const {tl} = this.state
		const {thumbnail, colorImg} = this.refs
		const mc = new Hammer.Manager(thumbnail, {
			recognizers: [
				[Hammer.Pan,{ direction: Hammer.DIRECTION_ALL }]
			]})
		mc.on('panend pancancel panstart panmove', function(e){
			tl.clear()
			switch(e.type){
				case "panend":
				case "pancancel":
					self.hammerEnd(e)
					break
				case "panstart":
					self.hammerStart(e)
					break
				case "panmove":
					self.hammerMove(e)
					break
				default:
					break
			}
		})
	}

	hammerStart(e){
		const {thumbnail} = this.refs
		const {x, y} = thumbnail._gsTransform
		const {deltaX, deltaY} = e
		this.setState(
			{
				mouse: 
				{
					mouseX: deltaX - x, 
					mouseY: deltaY - y
				},
				isDragging: true
			})
	}

	hammerMove(e){
		e.preventDefault()
		const {mouseX, mouseY} = this.state.mouse
		const centerX = e.deltaX - mouseX
		const centerY = e.deltaY - mouseY
		this.thumbnailSetPos(centerX , centerY)
	}


	hammerEnd(e){
		e.preventDefault()
		const self = this
		const {xPos, yPos} = this.state.defaultPos
		this.thumbnailGoTo(xPos,yPos,0.5)
		setTimeout(function() {
			self.setState({isDragging: false})
		}, 0)
	}

	thumbnailDefaultPos(){
		const {orientation, thumbnailSize,rWidth, rHeight} = this.props
		const yPos =  (rHeight/2) - (thumbnailSize/2)
		let xPos
		if ( orientation == LANDSCAPE ){
			xPos =  (rWidth/2) - (thumbnailSize + 40)
		} else {
			xPos =  rWidth/2 - thumbnailSize
		}
		return {xPos: xPos, yPos: yPos}
	}

	thumbnailGoTo(xPos, yPos, time, callback = null){
		const {tl} = this.state
		const {thumbnail, colorImg} = this.refs
		const tweenThumbnail = new TweenLite.to(thumbnail, time,
			{
				x: xPos+"px",
				y: yPos+"px",
				ease: Power2.easeInOut
			})
		const tweenImg = new TweenLite.to(colorImg, time,
			{
				x: -xPos+"px",
				y: -yPos+"px",
				ease: Power2.easeInOut
			})
			tl.clear()
			tl.add([tweenThumbnail, tweenImg])
			if ( callback != null ){
				tl.add(callback)
			}
	}

	thumbnailSetPos(xPos, yPos){
		const {tl} = this.state
		const {thumbnail, colorImg} = this.refs
		// tl.clear()
		tl.set(thumbnail,
			{
				x: xPos+"px",
				y: yPos+"px"
			}).set(colorImg,
			{
				x: -xPos+"px",
				y: -yPos+"px"
			})
	}

	thumbnailSetSize(size){
		const {tl} = this.state
		const {thumbnail} = this.refs
		tl.clear()
		tl.set(thumbnail,
			{
				width: size+"px",
				height: size+"px"
			})
	}

	handleClick(e){
		e.preventDefault()
		const {isDragging} = this.state
		const {data, kind, isRouting} = this.props
		if ( !isRouting && !isDragging ){
			browserHistory.push("/projects/"+data.title+"/detail")
		}
	}

	enterAnim(isUpdate, direction){
		const {tl, defaultPos} = this.state
		const {thumbnailSize, rHeight} = this.props
		const {thumbnail, colorImg, main} = this.refs
		const {time, enteringDelay, updatingDelay} = this.props.timers.hoverColor
		const delay = isUpdate ? 0.3 : 1.3
		let pos
		if ( direction < 0 ){
			pos = -thumbnailSize
		} else {
			pos = rHeight
		}
		const tweenThumbnail = new TweenLite.fromTo(thumbnail, 1,
			{
				y: pos
			},
			{
				y: defaultPos.yPos,
				ease: Power2.easeInOut
			})
		const tweenImg = new TweenLite.fromTo(colorImg, 1,
			{
				y: -pos
			},
			{
				y: -(defaultPos.yPos),
				ease: Power2.easeInOut
			})
		const tweenMain = new TweenLite.fromTo(main, 1,
			{
				opacity:0
			},
			{
				opacity:1,
				ease: Power2.easeInOut
			})
		tl.clear()
		tl.add([tweenThumbnail, tweenMain, tweenImg], delay)
		this.setState({didEnter: true})
	}

	leavingAnim(direction){
		const {tl, defaultPos} = this.state
		const {thumbnailSize, rHeight} = this.props
		const {thumbnail, colorImg, main} = this.refs
		const {time, leavingDelay} = this.props.timers.hoverColor

		let pos
		if ( direction > 0 ){
			pos = -thumbnailSize
		} else {
			pos = rHeight
		}

		const tweenThumbnail = new TweenLite.to(thumbnail, 1,
			{
				y: pos,
				ease: Power2.easeIn
			})
		const tweenImg = new TweenLite.to(colorImg, 1,
			{
				y: -pos,
				ease: Power2.easeIn
			})
		const tweenMain = new TweenLite.to(main, 1,
			{
				opacity:0,
				ease: Power2.easeIn,
			})
		tl.clear()
		tl.add([tweenThumbnail, tweenMain, tweenImg], 0.3)
	}

	leavingAnimDetail(){
		const {tl} = this.state
		const {rWidth, thumbnailFinalSize} = this.props
		const {main, thumbnail, colorImg, seeMore} = this.refs
		const {time, leavingDelay} = this.props.timers.hoverColor

		const tweenThumbnail = new TweenLite.to(thumbnail, 1,
			{
				x:0,
				y:0,
				width: 100+"%",
				height: thumbnailFinalSize+"px",
				textShadow: "0px 3px 13px 0 rgba(0, 0, 0, 0.3)",
				ease: Power2.easeInOut
			})
		const tweenImg = new TweenLite.to(colorImg, 1,
			{
				x:0,
				y:0,
				ease: Power2.easeInOut
			})
		const tweenSeeMore = new TweenLite.to(seeMore, 1,
			{
				opacity:0,
				ease: Power2.easeInOut
			})
		tl.clear()
		tl.add([tweenThumbnail, tweenImg, tweenSeeMore], 0.3)
	}

	

	render() {
		const {thumbnail} = this.props.data
		return (
			<div 
				className="fullscreen" 
				ref="main"
				draggable="false"
			>
				<a 
					href="#" 
					ref="thumbnail" 
					className="thumbnail"
					draggable="false"
					onClick={this.handleClick}
				>
					<img ref="colorImg" draggable="false" src={require("IMG/"+thumbnail)}/>
					<div ref="seeMore" draggable="false" className="see-more">.see-more</div>
				</a>
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { navigationReducer} = state
  const { responsiveReducer} = state
	const { projectAnimationReducer} = state


  const {
    route: reduxRoute,
    nextRoute: reduxNextRoute,
    isRouting: isRouting,
    routeKind: kind,
    nextRouteKind: nextKind,
    nextRouteDirection: nextDirection
  } = navigationReducer

  const {
    timers: timers
  } = projectAnimationReducer


  const {
		width: rWidth,
		height: rHeight,
		orientation: orientation,
		thumbnailSize: thumbnailSize,
		thumbnailFinalSize: thumbnailFinalSize
  } = responsiveReducer

  return {
    reduxRoute,
    reduxNextRoute,
    isRouting,
    kind,
    nextKind,
    nextDirection,
    thumbnailSize,
    orientation,
    rWidth,
    rHeight,
    timers,
    thumbnailFinalSize
  }
}

export default connect(mapStateToProps)(withRouter(HoverColor))
