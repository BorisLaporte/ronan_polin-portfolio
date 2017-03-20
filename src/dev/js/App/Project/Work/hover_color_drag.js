import React, { Component } from 'react'
import {TimelineLite, TweenLite, Power2} from 'gsap'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'
import {PORTRAIT, LANDSCAPE} from 'APP/Store/responsive/actions'

class HoverColor extends Component {
	constructor(props){
		super(props)

		this.state = {
			tl: null,
			isDragging: false,
			didEnter: false,
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

		this.onDrag = this.onDrag.bind(this)
		this.onDragStart = this.onDragStart.bind(this)
		this.onDragEnd = this.onDragEnd.bind(this)
	}

	componentWillMount() {
		this.setState({tl: new TimelineLite()})
	}

	componentDidMount() {
		this.init()
		// console.log("mount")
		// this.enterAnim(false, 1)
		
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

	init(){
		const {thumbnail} = this.refs
		const {thumbnailSize} = this.props
		const {xPos, yPos} = this.thumbnailDefaultPos()
		this.thumbnailSetPos(xPos, yPos)
		this.thumbnailSetSize(thumbnailSize)
		this.setState({defaultPos: {xPos: xPos, yPos: yPos}})

		thumbnail.addEventListener('dragstart', this.onDragStart)
		thumbnail.addEventListener('drag', this.onDrag)
		thumbnail.addEventListener('dragend', this.onDragEnd)
	}

	update(){
		console.log("udpate")
		const {tl} = this.state
		const {thumbnail} = this.refs
		const {thumbnailSize} = this.props
		const {xPos, yPos} = this.thumbnailDefaultPos()
		this.setState({defaultPos: {xPos: xPos, yPos: yPos}})
		this.thumbnailSetPos(xPos, yPos)
		this.thumbnailSetSize(thumbnailSize)
	}

	reset(){
		const {thumbnail} = this.refs
		thumbnail.removeEventListener('dragstart', this.onDragStart)
		thumbnail.removeEventListener('drag', this.onDrag)
		thumbnail.removeEventListener('dragend', this.onDragEnd)
	}

	onDragStart(e){
		const {thumbnail} = this.refs
		const {x, y} = thumbnail._gsTransform
		const {clientX, clientY} = e
		this.setState(
			{
				mouse: 
				{
					mouseX: clientX - x, 
					mouseY: clientY - y
				},
				isDragging: true
			})
	}

	onDrag(e){
		e.preventDefault()
		const {mouseX, mouseY} = this.state.mouse
		const centerX = e.clientX - mouseX
		const centerY = e.clientY - mouseY
		if ( e.clientX != 0 && e.clientY != 0 ){
			this.thumbnailSetPos(centerX , centerY)
		}
	}

	onDragEnd(e){
		e.preventDefault()
		const {xPos, yPos} = this.state.defaultPos
		this.thumbnailGoTo(xPos,yPos,0.5)
		this.setState({isDragging: false})
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
		tl.clear()
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
		const {data, kind, isRouting} = this.props
		if ( !isRouting ){
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
			>
				<a 
					href="#" 
					ref="thumbnail" 
					className="thumbnail"
					draggable="true"
					onClick={this.handleClick}
				>
					<img ref="colorImg" src={require("IMG/"+thumbnail)} alt=""/>
					<div ref="seeMore" className="see-more">.see-more</div>
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
