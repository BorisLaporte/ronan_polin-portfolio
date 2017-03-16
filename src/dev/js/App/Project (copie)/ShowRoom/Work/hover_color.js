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
		const {onFocus} = this.props
		this.init()
		if ( onFocus ){
			this.enterAnim()
		}
		
	}

	shouldComponentUpdate(nextProps, nextState) {
		if ( nextProps.leaving != null ){
			return true
		}
		return false
	}

	componentDidUpdate(prevProps, prevState) {
		const {leaving} = this.props
		if ( leaving != "projects" ){
			if ( leaving == "detail"){
				this.leavingAnimDetail()
			} else {
				this.leavingAnim()
			}
		} 
	}

	componentWillUnmount() {
		this.reset()
	}

	init(){
		const {thumbnail} = this.refs
		const {xPos, yPos} = this.thumbnailDefaultPos()
		this.setState({defaultPos: {xPos: xPos, yPos: yPos}})
		this.thumbnailSetPos(xPos, yPos)

		thumbnail.addEventListener('dragstart', this.onDragStart)
		thumbnail.addEventListener('drag', this.onDrag)
		thumbnail.addEventListener('dragend', this.onDragEnd)
	}

	update(){
		const {tl} = this.state
		const {thumbnail} = this.refs
		const {thumbnailSize} = this.props
		const {xPos, yPos} = this.thumbnailDefaultPos()
		this.state.defaultPos = {xPos: xPos, yPos: yPos}
		this.thumbnailSetPos(xPos, yPos)
		tl.set(thumbnail, 
			{
				width: thumbnailSize,
				height: thumbnailSize
			})
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
		const {innerWidth, innerHeight} = window
		const {orientation, thumbnailSize} = this.props
		const yPos =  (innerHeight/2) - (thumbnailSize/2)
		let xPos
		if ( orientation == LANDSCAPE ){
			xPos =  (innerWidth/2) - (thumbnailSize + 40)
		} else {
			xPos =  innerWidth/2 - thumbnailSize
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
				ease: Power2.easeOut
			})
		const tweenImg = new TweenLite.to(colorImg, time,
			{
				x: -xPos+"px",
				y: -yPos+"px",
				ease: Power2.easeOut
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

	handleClick(e){
		e.preventDefault()
		const {location, kind, isRouting} = this.props
		if ( !isRouting ){
			browserHistory.push(location.pathname+"/detail")
		}
	}

	enterAnim(){
		const {tl} = this.state
		const {main} = this.refs
		const {time, enteringDelay} = this.props.timers.hoverColor
		const tweenMain = new TweenLite.fromTo(main, time,
			{
				opacity:0
			},
			{
				opacity:1,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain], enteringDelay)

	}

	leavingAnim(){
		const {tl} = this.state
		const {main} = this.refs
		const {time, leavingDelay} = this.props.timers.hoverColor
		const tweenMain = new TweenLite.to(main, time,
			{
				opacity:0,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain], leavingDelay)
	}

	leavingAnimDetail(){
		const {tl} = this.state
		const {main, thumbnail, colorImg, seeMore} = this.refs
		const {time, leavingDelay} = this.props.timers.hoverColor
		const tweenThumbnail = new TweenLite.to(thumbnail, time,
			{
				x:0,
				y:0,
				width: 100+"%",
				height: 700+"px",
				boxShadow: "none",
				ease: Power2.easeOut
			})
		const tweenImg = new TweenLite.to(colorImg, time,
			{
				x:0,
				y:0,
				ease: Power2.easeOut
			})
		const tweenSeeMore = new TweenLite.to(seeMore, time,
			{
				opacity:0,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenThumbnail, tweenImg, tweenSeeMore], leavingDelay)
	}

	render() {
		const {thumbnail} = this.props
		return (
			<div 
				className="hover-color" 
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
		orientation: orientation,
		thumbnailSize: thumbnailSize
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
    timers
  }
}

export default connect(mapStateToProps)(withRouter(HoverColor))