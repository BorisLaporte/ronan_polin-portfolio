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
			if ( where == "projects" ){
				this.switchAnim()
			} else if ( where == "detail" ) {
				this.leaveAnim(true)
			} else {
				this.leaveAnim(false)
			}
		} else if ( type == "entering" ){
			this.enterAnim(true)
		}
	}

	enterAnim(isUpdate){
		const {tl} = this.state
		const {main} = this.refs
		tl.clear()
		if ( !isUpdate ){
			const tweenMain = new TweenLite.fromTo(main, 0.6,
				{
					opacity:0
				},
				{
					opacity:1,
					ease: Power2.easeOut
				})
			tl.add([tweenMain], 0.4)
		} else {
			tl.set(main,{
				opacity: 1
			})
		}

	}

	switchAnim(){
		const {tl} = this.state
		const {main} = this.refs
		const tweenMain = new TweenLite.to(main, 0.6,
			{
				opacity:0,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain], 1)
	}

	leaveAnim(isDetail){
		const {tl} = this.state
		const {main, next} = this.refs
		const delay = isDetail ? 0.4 : 1.3
		tl.clear()
		const tweenMain = new TweenLite.to(main, 0.5,
			{
				opacity:0,
				ease: Power2.easeOut
			})
		if ( next != null ){
			const tweenNext = new TweenLite.to(next, 0.5,
				{
					opacity:0,
					ease: Power2.easeOut
				})
			tl.add([tweenMain, tweenNext], delay)
		} else {
			tl.add([tweenMain], delay)
		}
	}

	render() {
		const {img, next} = this.props
		return (
			<div>
				{ (next != null) &&
					<div 
						className={"fullscreen back-blur"} 
						ref="next"
						style={{backgroundImage: 'url('+require(	"IMG/"+next)+')' }}
					>
					</div>
				}
				<div 
					className={"fullscreen back-blur"} 
					ref="main"
					style={{backgroundImage: 'url('+require(	"IMG/"+img)+')' }}
				>
				</div>
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