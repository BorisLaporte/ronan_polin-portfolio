import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {TimelineLite, TweenLite, Power2} from 'gsap'

class BackBlur extends Component {
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
		this.enterAnim(false)
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {img, event} = this.props
		if ( nextProps.event != event || nextProps.img != img ){
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
			this.enterAnim(true)
		}
	}

	enterAnim(isUpdate){
		const {tl} = this.state
		const {main} = this.refs
		const {time, enteringDelay, updatingDelay} = this.props.timers.backBlur
		const delay = isUpdate ? updatingDelay : enteringDelay
		const tweenMain = new TweenLite.fromTo(main, time,
			{
				opacity:0
			},
			{
				opacity:1,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain], delay)

	}

	leavingAnim(){
		const {tl} = this.state
		const {main} = this.refs
		const {time, leavingDelay} = this.props.timers.backBlur
		const tweenMain = new TweenLite.to(main, time,
			{
				opacity:0,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain], leavingDelay)
	}

	render() {
		const {img} = this.props
		return (
			<div 
				className={"fullscreen back-blur"} 
				ref="main"
				style={{backgroundImage: 'url('+require(	"IMG/"+img)+')' }}
			>
			</div>
		)
	}
}
// <img src={require("IMG/"+img)} alt=""/>
// style={{backgroundImage: 'url('+require(	"IMG/"+img)+')' }}

BackBlur.propTypes = {
	img: PropTypes.string.isRequired,
	event: PropTypes.object
}

function mapStateToProps(state) {
  const { projectAnimationReducer} = state

  const {
    timers: timers
  } = projectAnimationReducer

  return {
    timers
  }
}

export default connect(mapStateToProps)(BackBlur)