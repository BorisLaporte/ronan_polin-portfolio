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
		const {time, enteringDelay} = this.props.timers.backBlur
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
				className={"back back-blur"} 
				ref="main"
			>
				<img src={require("IMG/"+img)} alt=""/>
			</div>
		)
	}
}
// <img src={require("IMG/"+img)} alt=""/>
// style={{backgroundImage: 'url('+require(	"IMG/"+img)+')' }}

BackBlur.propTypes = {
	img: PropTypes.string.isRequired,
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

export default connect(mapStateToProps)(BackBlur)