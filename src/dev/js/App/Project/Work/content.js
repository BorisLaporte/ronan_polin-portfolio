import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'
import {TimelineLite, TweenLite, Power2} from 'gsap'

class Content extends Component {
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
		const {data, event} = this.props
		if ( nextProps.event != event || data != nextProps.data ){
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
		const {time, enteringDelay, updatingDelay} = this.props.timers.content
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
		const {time, leavingDelay} = this.props.timers.content
		const tweenMain = new TweenLite.to(main, time,
			{
				opacity:0,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain], leavingDelay)
	}

	render() {
		const {title, intro} = this.props.data
		return (
			<div className="name-project" ref="main">
				<div className="in-middle">
					<div className="title center" ref="title">{title}</div>
					<div className="intro">
						<div className="content">
							<span className="line">{intro.part1}</span>
							<span className="line">{intro.part2}</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Content.propTypes = {
	data: PropTypes.object.isRequired,
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

export default connect(mapStateToProps)(Content)