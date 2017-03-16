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
		const {onFocus} = this.props
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
			this.leavingAnim()
		}
	}

	enterAnim(){
		const {tl} = this.state
		const {main} = this.refs
		const {time, enteringDelay} = this.props.timers.content
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
			<div className="content" ref="main">
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

Content.propTypes = {
	data: PropTypes.object.isRequired,
	onFocus: PropTypes.bool.isRequired,
	leaving: PropTypes.string
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