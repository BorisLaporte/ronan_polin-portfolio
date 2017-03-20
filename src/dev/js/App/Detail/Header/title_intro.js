import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {LANDSCAPE} from 'APP/Store/responsive/actions'

class TitleIntro extends Component {
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
		const {comingFrom} = this.props.event
		if (comingFrom == "projects"){
			this.enterAnim(true)
		} else {
			this.enterAnim(false)
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {title, color, intro, event} = this.props
		if ( nextProps.event != event 
			|| nextProps.title != title 
			|| nextProps.intro != intro 
			|| nextProps.color != color 
		){
			return true
		}
		return false
	}

	componentDidUpdate(prevProps, prevState) {
		this.handleAnimations()
	}

	handleAnimations(){
		const {type, where, comingFrom} = this.props.event
		if ( type == "leaving" ){
			this.leavingAnim()
		} else if ( type == "entering" ){
			if ( comingFrom == "projects" ){
				this.enterAnim(true)
			} else {
				this.enterAnim(false)
			}
		}
	}

	enterAnim(fromDetail){
		const {tl} = this.state
		const {main, intro, content, title} = this.refs
		const {orientation} = this.props
		const delay = fromDetail ? 0.5 : 1.5
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
				y: -20
			},
			{
				y: 0,
				ease: Power2.easeOut
			})
		let tweenIntro
		if ( orientation == LANDSCAPE ){
			tweenIntro = new TweenLite.fromTo(intro, 1,
				{
					x: 100+"%"
				},
				{
					x: 0+"%",
					ease: Power2.easeOut
				})
		} else {
			tweenIntro = new TweenLite.fromTo(intro, 1,
				{
					x: 100+"%"
				},
				{
					x: -50+"%",
					ease: Power2.easeOut
				})
		}
		
		const tweenContent = new TweenLite.fromTo(content, 1,
			{
				x: -100+"%"
			},
			{
				x: 0+"%",
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain, tweenTitle], delay).add([tweenContent, tweenIntro], "-=0.4")
	}

	leavingAnim(){
		const {tl} = this.state
		const {main, intro, content, title} = this.refs
		const tweenMain = new TweenLite.to(main, 1,
			{
				opacity:0,
				ease: Power2.easeOut
			})
		const tweenTitle = new TweenLite.to(title, 1,
			{
				y: -20,
				ease: Power2.easeOut
			})
		const tweenIntro = new TweenLite.to(intro, 1,
			{
				x: 100+"%",
				ease: Power2.easeOut
			})
		const tweenContent = new TweenLite.to(content, 1,
			{
				x: -100+"%",
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenContent, tweenIntro, tweenTitle]).add([tweenMain], "-=0.6")
	}

	render() {
		const {title, intro, color} = this.props
		return (
			<div className={"name-project "+color} ref="main">
				<div className="in-middle">
					<div className="title" ref="title">{title}</div>
					<div className="wrapper-intro">
						<div className="container-intro">
							<div className="intro" ref="intro">
								<div className="content" ref="content">
									<span className="line">{intro.part1}&nbsp;</span>
									<span className="line">{intro.part2}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

TitleIntro.propTypes = {
	title: PropTypes.string.isRequired,
	intro: PropTypes.object.isRequired,
	color: PropTypes.string.isRequired
}


function mapStateToProps(state) {
  const { responsiveReducer} = state

  const {
    orientation: orientation
  } = responsiveReducer

  return {
    orientation
  }
}


export default connect(mapStateToProps)(TitleIntro)