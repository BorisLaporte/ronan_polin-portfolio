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

  componentWillUpdate(nextProps, nextState) {
    if ( nextProps.isRouting && nextProps.nextKind == "about" ){
      this.leavingAnim()
    }
  }

  componentDidMount() {
		this.enteringAnim()
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
    const tweenContainer = new TweenLite.fromTo(container, 1,
			{
        opacity: 0
      },
      {
				opacity: 1,
				ease: Power2.easeOut
			})
    const tweenTitle = new TweenLite.fromTo(title, 1,
			{
				x: -30
			},
      {
        x: 0,
        ease: Power2.easeOut,
        clearProps:"x"
      })
    const tweenLooking = new TweenLite.fromTo(looking, 1,
			{
				x: 30
			},
      {
        x: 0,
        ease: Power2.easeOut,
        clearProps:"x"
      })
    tl.clear()
    tl.add([tweenContainer, tweenTitle, tweenLooking], 0.4)
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
    tl.clear()
    tl.add([tweenContainer, tweenTitle, tweenLooking]).pause()
    if ( callback != null ){
      tl.add(callback, "-=0.8")
    }
    tl.play()
  }

	render() {
		const {to} = this.state
		return (
			<a href={to} ref="container" onClick={this.handleClick} className="link about" >
				<div ref="title" >.about</div>
				<div ref="looking" className="looking-for">looking for a 6 month internship...</div>
			</a>
		)
	}
}

function mapStateToProps(state) {
  const { navigationReducer} = state


  const {
    isRouting: isRouting,
    nextRouteKind: nextKind,
    route: reduxRoute,
    routeKind: kind,
    comingFrom: comingFrom
  } = navigationReducer

  return {
    isRouting,
    nextKind,
    reduxRoute,
    kind,
    comingFrom
  }
}


export default connect(mapStateToProps)(About)

