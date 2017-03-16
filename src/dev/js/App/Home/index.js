import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import {TweenLite, TimelineLite, Power2} from 'gsap'
import {itWillPush, DID_PUSH} from 'APP/Store/navigation/actions'

class Home extends Component {
	constructor(props){
		super(props)

		this.state = {
			readyForNext: false,
			tl: null
		}

		this.routerWillLeave = this.routerWillLeave.bind(this)
	}

	componentWillMount() {
		this.setState({tl: new TimelineLite()})
	}

	componentDidMount() {
		const {route, router} = this.props
    router.setRouteLeaveHook(route, this.routerWillLeave)
    this.animationEnter()
  }

  routerWillLeave(nextLocation) {
    const {readyForNext} = this.state
    const {router, dispatch} = this.props
    if ( readyForNext ){
			return true
    } else {
			dispatch(itWillPush(nextLocation.pathname))
			this.animationLeave(()=>{
				this.setState({readyForNext: true})
				router.push(nextLocation.pathname)
				dispatch({ type: DID_PUSH })
			})
			return false
		}
  }

  componentWillUnmount() {
		const {tl} = this.state
		tl.clear()
  }

  animationLeave(callback){
		const {tl} = this.state
		const {home} = this.refs
		tl.clear()
		const body = new TweenLite.to(home, 0.5,
			{	
				opacity: 0,
				ease: Power2.easeOut,
				onComplete: callback
			})
		tl.add([body])
  }

  animationEnter(){
		const {tl} = this.state
		const {home} = this.refs
		const body = new TweenLite.fromTo(home, 1,
			{
				opacity: 0
			},
			{	
				opacity: 1,
				ease: Power2.easeOut
			})
		tl.add([body], 1)
  }

	render() {
		const {firstName, lastName, date, student, freelance} = this.props.data.home
		return (
			<div id="home" className="sub-wrapper in-middle" ref="home" >
				<div className="main center">
					<div className="name shadowy">
						<div className="first-name">{firstName}</div>
						<div className="last-name">{lastName}</div>
					</div>
					<div className="date">{date}</div>
				</div>
				<div className="intro center">
					<div className="content" >
						<span className="line">{student}</span>
						<span className="line">{freelance}</span>
					</div>
				</div>
			</div>
		)
	}
}

Home.propTypes = {
	route: PropTypes.object.isRequired,
	router: PropTypes.object.isRequired
}


function mapStateToProps(state) {
  const { contentReducer} = state

  const {
    items: data
  } = contentReducer

  return {
    data
  }
}


export default connect(mapStateToProps)(withRouter(Home))