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
			isScrolling: false,
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
		this.onScroll = this.onScroll.bind(this)
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
		const {nextKind} = this.props
		if ( nextKind == "projects"){
			this.initProject()
		}
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return true
	// }

	componentDidUpdate(prevProps, prevState) {
		const {isDragging} = this.state
		const {kind, nextKind, reduxRoute, reduxNextRoute, isRouting, orientation, thumbnailSize} = this.props
		console.log("PROPS !!!!!!!!!!!!!")
		console.log(prevProps)
		console.log(this.props)
		console.log("STATE !!!!!!!!!!!!!!!")
		console.log(prevState)
		console.log(this.state)
		if ( isRouting ){
			this.handleExit()
		}
		if ( isRouting && nextKind == "projects" ){
			// SWITCHING PROJECTS
			this.projectsLeavingAnim()
		} else if ( isRouting && nextKind == "detail" ){
			// GOING TO DETAIL
			this.detailLeavingAnim()
		} else if ( 
			!isRouting 
			&& kind == "projects" 
			&& reduxRoute != prevProps.reduxRoute
		){
			// GOING TO DETAIL
			this.projectsEnteringAnim()
		} else if (kind == "detail" && prevProps.kind == "projects" ){
			// IS ON DETAIL AND MUST UNCHECKED EVERYTHING
			this.resetProject()
		} else if ( 
			kind == "projects" && 
			(
				orientation != prevProps.orientation
				||
				thumbnailSize != prevProps.thumbnailSize 
			) 
		){
			// UPDATE PROJECT
			this.updateProject()
		}
	}

	handleExit(){
		const {nextKind} = this.props
		if ( nextKind == "projects" ){
			// SWITCHING PROJECTS
			this.projectsLeavingAnim()
		} else if ( nextKind == "detail" ){
			// GOING TO DETAIL
			this.detailLeavingAnim()
		} else {
			this.leavingAnim()
		}
	}

	handleEntering(){

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
		} else if (nextIndex > data.projects.length){
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

	initProject(){
		const {thumbnail} = this.refs
		const {xPos, yPos} = this.thumbnailDefaultPos()
		this.setState({defaultPos: {xPos: xPos, yPos: yPos}})
		this.thumbnailSetPos(xPos, yPos)

		thumbnail.addEventListener('dragstart', this.onDragStart)
		thumbnail.addEventListener('drag', this.onDrag)
		thumbnail.addEventListener('dragend', this.onDragEnd)
		window.addEventListener('wheel', this.onScroll)
	}

	updateProject(){
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

	resetProject(){
		const {thumbnail} = this.refs
		thumbnail.removeEventListener('dragstart', this.onDragStart)
		thumbnail.removeEventListener('drag', this.onDrag)
		thumbnail.removeEventListener('dragend', this.onDragEnd)
		window.removeEventListener('onwheel', this.onScroll)
	}

	initDetail(){

	}

	updateDetail(){

	}

	resetDetail(){

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
		const {location, kind} = this.props
		if ( kind != "detail" ){
			browserHistory.push(location.pathname+"/detail")
		}
	}

	detailLeavingAnim(callback = null){
		const {tl} = this.state
    const {thumbnail, colorImg} = this.refs
    const tweenThumbnail =  new TweenLite.to(thumbnail, 1,
			{
				x: 0,
				y: 0,
				ease: Power2.easeOut
			})
			const tweenThumbnailbis = new TweenLite.set(thumbnail,
			{
				css:{
					className:'+=detail'
				},
			})
    const tweenImg = new TweenLite.to(colorImg, 1,
			{
				x: 0,
				y: 0,
				ease: Power2.easeOut
			})
    tl.clear()
    tl.add([tweenThumbnail, tweenImg]).add(tweenThumbnailbis, 1)
    if ( callback != null ){
    	tl.add(callback, "-=1")
    }
	}

	projectsLeavingAnim(){
		const {tl, defaultPos} = this.state
		const {nextDirection} = this.props
    const {thumbnail, colorImg} = this.refs
    const {innerHeight} = window
    const factor = (innerHeight/3) * nextDirection
    const tweenThumbnail = new TweenLite.to(thumbnail, 1,
			{
				x: defaultPos.xPos+"px",
				y: factor+"px",
				opacity: 0,
				ease: Power2.easeOut
			})
		const tweenImg = new TweenLite.to(colorImg, 1,
			{
				x: -defaultPos.xPos+"px",
				y: -factor+"px",
				opacity: 0,
				ease: Power2.easeOut
			})
			tl.clear()
			tl.add([tweenThumbnail, tweenImg], 0.5)
	}

	projectsEnteringAnim(){
		const {tl, defaultPos} = this.state
		const {nextDirection, thumbnailSize} = this.props
    const {thumbnail, colorImg} = this.refs
    const {innerHeight} = window
    const factor = (innerHeight/3) * nextDirection
		const tweenThumbnail = new TweenLite.fromTo(thumbnail, 1,
			{
				x: defaultPos.xPos+"px",
				y: -factor+"px",
				opacity: 0
			},
			{
				x: defaultPos.xPos+"px",
				y: defaultPos.yPos+"px",
				opacity: 1,
				ease: Power2.easeOut
			})
		const tweenImg = new TweenLite.fromTo(colorImg, 1,
			{
				x: -defaultPos.xPos+"px",
				y: factor+"px",
				opacity: 0
			},
			{
				x: -defaultPos.xPos+"px",
				y: -defaultPos.yPos+"px",
				opacity: 1,
				ease: Power2.easeOut
			})
			tl.clear()
			tl.add([tweenThumbnail, tweenImg], 1)
	}

	render() {
		const {thumbnail, color, thumbnailSize, kind} = this.props
		return (
			<div 
				className="hover-color" 
				ref="container"
			>
			{ false ?
				<div className="thumbnail detail" ref="thumbnail">
					<img ref="colorImg" src={require("IMG/"+thumbnail)} alt=""/>
					
				</div>
				:
				<a 
					href="#" 
					ref="thumbnail" 
					className="thumbnail"
					draggable="true"
					onClick={this.handleClick}
				>
					<img ref="colorImg" src={require("IMG/"+thumbnail)} alt=""/>
					<div className="see-more">.see-more</div>
				</a>

		}
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { contentReducer} = state
  const { navigationReducer} = state
  const { responsiveReducer} = state

  const {
    items: data
  } = contentReducer

  const {
    route: reduxRoute,
    nextRoute: reduxNextRoute,
    isRouting: isRouting,
    routeKind: kind,
    nextRouteKind: nextKind,
    nextRouteDirection: nextDirection
  } = navigationReducer

  const {
		orientation: orientation,
		thumbnailSize: thumbnailSize
  } = responsiveReducer

  return {
    data,
    reduxRoute,
    reduxNextRoute,
    isRouting,
    kind,
    nextKind,
    nextDirection,
    thumbnailSize,
    orientation
  }
}

export default connect(mapStateToProps)(withRouter(HoverColor))