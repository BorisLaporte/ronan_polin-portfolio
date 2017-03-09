import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter, browserHistory } from 'react-router'
import {TweenLite, TimelineLite, Power2} from 'gsap'

class About extends Component {
	constructor(props){
		super(props)

		this.state = {
      tl: null,
      reg: /^\/about$/,
      to: '/about'
		}

		this.handleClick = this.handleClick.bind(this)
	}

	componentWillMount() {
    this.setState({tl: new TimelineLite()})
  }

  componentDidMount() {
		this.enteringAnim()
  }

  componentWillUpdate(nextProps, nextState) {
    const {reg} = this.state
    if ( nextProps.isRouting && reg.test(nextProps.reduxNextRoute) ){
      this.leavingAnim()
    }
  }

  handleClick(e) {
    const {to, tl} = this.state
    e.preventDefault()
    tl.clear()
    this.leavingAnim(() => {
			browserHistory.push(to)
    })
  }

  enteringAnim(){
		const {tl} = this.state
    const {container, title, looking} = this.refs
    const tweenContainer = new TweenLite.from(container, 1,
			{
				opacity: 0,
				ease: Power2.easeOut
			})
    const tweenTitle = new TweenLite.from(title, 1,
			{
				x: -30,
				ease: Power2.easeOut
			})
    const tweenLooking = new TweenLite.from(looking, 1,
			{
				x: 30,
				ease: Power2.easeOut
			})
    tl.add([tweenContainer, tweenTitle, tweenLooking])
  }

  leavingAnim(callback = null){
    const {tl} = this.state
    const {container, title, looking} = this.refs

    const tweenContainer = new TweenLite.to(container, 1,
			{
				opacity: 0,
				ease: Power2.easeOut
			})
    const tweenTitle = new TweenLite.to(title, 1,
			{
				x: 30,
				ease: Power2.easeOut
			})
    const tweenLooking = new TweenLite.to(looking, 1,
			{
				x: -30,
				ease: Power2.easeOut
			})
    tl.add([tweenContainer, tweenTitle, tweenLooking]).pause()
    if ( callback != null ){
      tl.add(callback, "-=0.8")
    }
    tl.play()
  }

	render() {
		const {to} = this.state
		return (
			<a href={to} ref="container" onClick={this.handleClick} className="link" >
				<div ref="title" >.about</div>
				<div ref="looking" className="looking-for">looking for a 6 month internship...</div>
			</a>
		)
	}
}

function mapStateToProps(state) {
  const { navigationReducer} = state


  const {
    route: reduxRoute,
    nextRoute: reduxNextRoute,
    isRouting: isRouting
  } = navigationReducer

  return {
    reduxRoute,
    reduxNextRoute,
    isRouting
  }
}


export default connect(mapStateToProps)(withRouter(About))
