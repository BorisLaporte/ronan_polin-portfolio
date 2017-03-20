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
		const {main, intro, content, title} = this.refs
		const tweenMain = new TweenLite.fromTo(main, 1,
			{
				opacity:0
			},
			{
				opacity:1,
				ease: Power2.easeOut
			})
		const tweenTitle = new TweenLite.fromTo(title, 1,
			{
				x: -40+"%"
			},
			{
				x: -50+"%",
				ease: Power2.easeOut
			})
		const tweenIntro = new TweenLite.fromTo(intro, 1,
			{
				x: 100+"%"
			},
			{
				x: 0+"%",
				ease: Power2.easeOut
			})
		const tweenContent = new TweenLite.fromTo(content, 1,
			{
				x: -100+"%"
			},
			{
				x: 0+"%",
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain, tweenTitle], 1.8).add([tweenContent, tweenIntro], "-=0.6")
	}

	leavingAnim(){
		const {tl} = this.state
		const {main, intro, content, title} = this.refs
		const tweenMain = new TweenLite.to(main, 0.9,
			{
				opacity:0,
				ease: Power2.easeOut
			})
		const tweenTitle = new TweenLite.to(title, 0.9,
			{
				x: -40+"%",
				ease: Power2.easeOut
			})
		const tweenIntro = new TweenLite.to(intro, 0.9,
			{
				x: 100+"%",
				ease: Power2.easeOut
			})
		const tweenContent = new TweenLite.to(content, 0.9,
			{
				x: -100+"%",
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenContent, tweenIntro, tweenTitle]).add([tweenMain], "-=0.6")
	}

	render() {
		const {title, intro} = this.props.data
		return (
			<div className="name-project" ref="main">
				<div className="in-middle">
					<div className="title center" ref="title">{title}</div>
					<div className="wrapper-intro">
						<div className="intro" ref="intro">
							<div className="content" ref="content">
								<span className="line">{intro.part1}&nbsp;</span>
								<span className="line">{intro.part2}</span>
							</div>
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