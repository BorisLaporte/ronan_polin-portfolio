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
		this.enterAnim()
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {reduxRoute, reduxNextRoute} = this.props
		if ( 
			( nextProps.isRouting && nextProps.reduxNextRoute != reduxNextRoute )
			|| ( !nextProps.isRouting && nextProps.reduxRoute != reduxRoute )
		){
			return true
		}
		return false
	}

	componentDidUpdate(prevProps, prevState) {
		const {isRouting} = this.props
		if ( isRouting ){
			this.leavingAnim()
		} else {
			this.enterAnim()
		}
	}

	enterAnim(){
		const {tl} = this.state
		const {main} = this.refs
		const tweenMain = new TweenLite.fromTo(main, 0.5,
			{
				opacity:0
			},
			{
				opacity:1,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain])

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
		tl.add([tweenMain])
	}

	render() {
		const {color, thumbnail} = this.props
		return (
			<div 
				className={"back back-blur "+color} 
				ref="main"
				style={{backgroundImage: 'url('+require(	"IMG/"+thumbnail)+')' }}
			>
			</div>
		)
	}
}

BackBlur.propTypes = {
	thumbnail: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired
}


function mapStateToProps(state) {
  const { navigationReducer} = state


  const {
    route: reduxRoute,
    nextRoute: reduxNextRoute,
    isRouting: isRouting,
  } = navigationReducer

  return {
    reduxRoute,
    reduxNextRoute,
    isRouting
  }
}

export default connect(mapStateToProps)(BackBlur)