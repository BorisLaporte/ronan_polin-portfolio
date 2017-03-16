import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {TimelineLite, TweenLite, Power2} from 'gsap'
import {PORTRAIT, LANDSCAPE} from 'APP/Store/responsive/actions'


class Square extends Component {
	constructor(props){
		super(props)

		this.state = {
			tl: null
		}
	}

	componentWillMount() {
		this.setState({tl: new TimelineLite()})
	}

	componentDidMount() {
		this.squareSetDefaultPos()
		this.enterAnim()
	}

	
	shouldComponentUpdate(nextProps, nextState) {
		const {color, event} = this.props
		if ( nextProps.event != event ){
			return true
		}
		return false
	}

	componentDidUpdate(prevProps, prevState) {
		this.handleAnimations()
	}

	handleAnimations(){
		const {type, where, direction} = this.props.event
		if ( type == "leaving" ){
			this.leavingAnim()
		} else if ( type == "entering" ){
			// this.enterAnim()
			console.log(direction)
		}
	}

	enterAnim(){
		const {tl} = this.state
		const {main} = this.refs
		const {time, enteringDelay} = this.props.timers.square
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
		const {time, leavingDelay} = this.props.timers.square
		const tweenMain = new TweenLite.fromTo(main, time,
			{
				opacity:1
			},
			{
				opacity:0,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain], leavingDelay)
	}

	squareSetPos(xPos, yPos, size){
		const {tl} = this.state
		const {main} = this.refs
		tl.clear()
		tl.set(main,
			{
				x: xPos+"px",
				y: yPos+"px",
				height: size+"px"
			})
	}


	squareSetDefaultPos(){
		const {innerWidth, innerHeight} = window
		const {orientation, thumbnailSize, projectsSize} = this.props
		const yPos =  (innerHeight/2) - (thumbnailSize/2) + 65
		let xPos
		if ( orientation == LANDSCAPE ){
			xPos =  (innerWidth/2) - (thumbnailSize + 40) + 65
		} else {
			xPos =  innerWidth/2 - thumbnailSize + 65
		}
		const size = (projectsSize * innerHeight) - (yPos * 2)
		// return {xPos: xPos, yPos: yPos}
		this.squareSetPos(xPos, yPos, size)
	}

	render() {
		const {squareSize, color} = this.props
		return (
			<div className="square-wrapper" ref="scroll">
				<div 
					className={"square "+color}
					ref="main"
					style={{width: squareSize}}
				></div>
			</div>
		)
	}
}

Square.propTypes = {
	event: PropTypes.object
}

function mapStateToProps(state) {
  const { colorReducer} = state
  const { responsiveReducer} = state
  const { projectAnimationReducer} = state

  const {
    color: color
  } = colorReducer

  const {
    timers: timers
  } = projectAnimationReducer

  const {
		orientation: orientation,
		squareSize: squareSize,
		thumbnailSize: thumbnailSize
  } = responsiveReducer

  return {
    color,
    squareSize,
    orientation,
    thumbnailSize,
    timers
  }
}

export default connect(mapStateToProps)(Square)