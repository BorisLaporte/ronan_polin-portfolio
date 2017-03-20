import React, { Component, PropTypes } from 'react'
import { withRouter} from 'react-router'
import {connect} from 'react-redux'
import {TweenLite, TimelineLite, Power2} from 'gsap'
import {itWillPush, DID_PUSH} from 'APP/Store/navigation/actions'

class Home extends Component {
	constructor(props){
		super(props)

		this.state = {
			readyForNext: false,
			isScrolling: false,
			prefix: "/projects/",
			tl: null
		}

		this.routerWillLeave = this.routerWillLeave.bind(this)
		this.onScroll = this.onScroll.bind(this)
	}

	componentWillMount() {
		this.setState({tl: new TimelineLite()})
	}

	componentDidMount() {
		const {route, router} = this.props
    router.setRouteLeaveHook(route, this.routerWillLeave)
    window.addEventListener('wheel', this.onScroll)
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

  shouldComponentUpdate(nextProps, nextState) {
		if ( this.props != nextProps || nextState.readyForNext ){
			return true
		}
		return false
  }

  onScroll(e){
    e.preventDefault()
    const {deltaY} = e
    const {isScrolling, prefix} = this.state
    const {router, data} = this.props
    if ( !isScrolling ){
      if ( deltaY >= 30 || deltaY <= -30 ){
				router.push(prefix+data.projects[0])
				this.setState({isScrolling: true})
      }
    }
  }

  componentWillUnmount() {
		window.removeEventListener('wheel', this.onScroll)
  }

  animationLeave(callback){
		const {tl} = this.state
		const {home, intro, content} = this.refs
		tl.clear()
		const body = new TweenLite.to(home, 0.5,
			{	
				opacity: 0,
				ease: Power2.easeOut,
				onComplete: callback
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
		tl.add([tweenIntro, tweenContent]).add([body], '-=0.6')
  }

  animationEnter(){
		const {tl} = this.state
		const {home, intro, content, name} = this.refs
		const body = new TweenLite.fromTo(home, 1,
			{
				opacity: 0
			},
			{
				opacity: 1,
				ease: Power2.easeOut
			})
		const tweenIntro = new TweenLite.fromTo(intro, 1,
			{
				x: 50+"%"
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
		tl.add([body], 1).add([tweenContent, tweenIntro], "-=0.4")
  }


	render() {
		const {firstName, lastName, date, student, freelance} = this.props.data.home
		return (
			<div id="home" className="sub-wrapper in-middle" ref="home" >
				<div className="main center">
					<div className="name shadowy" ref="name">
						<div className="first-name">{firstName}</div>
						<div className="last-name">{lastName}</div>
					</div>
					<div className="date">{date}</div>
				</div>
				<div className="wrapper-intro center">
					<div className="intro" ref="intro">
						<div className="content" ref="content">
							<span className="line">{student}&nbsp;</span>
							<span className="line">{freelance}</span>
						</div>
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