import React, { Component, PropTypes } from 'react'

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
		this.enterAnim(false)
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {thumbnail, event} = this.props
		if ( nextProps.event != event || nextProps.thumbnail != thumbnail ){
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
			this.enterAnim(true)
		}
	}

	enterAnim(isUpdate){
		const {tl} = this.state
		const {main} = this.refs
		const tweenMain = new TweenLite.fromTo(main, 1,
			{
				opacity:0
			},
			{
				opacity:1,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain], 0.2)

	}

	leavingAnim(){
		const {tl} = this.state
		const {main} = this.refs
		const tweenMain = new TweenLite.to(main, 1,
			{
				opacity:0,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain], 0.1)
	}

	render() {
		const {title, intro, color} = this.props
		return (
			<div className={"name-project "+color} ref="main">
				<div className="in-middle">
					<div className="title" ref="title">{title}</div>
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

TitleIntro.propTypes = {
	title: PropTypes.string.isRequired,
	intro: PropTypes.object.isRequired,
	color: PropTypes.string.isRequired
}

export default TitleIntro