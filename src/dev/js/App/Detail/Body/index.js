import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as ScrollMagic from 'scrollmagic'

import Logo from './logo'
import Specs from './Specs'
import MiseEnBouche from './MiseEnBouche'
import Headline from './headline'
import Team from './Team'
import Description from './description'
import PreMess from './PreMess'
import TheMaze from './TheMaze'


class Body extends Component {
	constructor(props){
		super(props)
		this.state = {
			tl: null,
			scController: null,
			scScene: null
		}
	}

	componentWillMount() {
		this.setState({
			tl: new TimelineLite(),
			scController: new ScrollMagic.Controller()
		})
	}

	componentDidMount() {
		const {comingFrom} = this.props
		if ( comingFrom == "detail" ){
			this.enterAnim(false)
		}
	}

	// setScene(trigger){
	// 	const {scController} = this.state
	// 	new ScrollMagic.Scene({
	// 			triggerElement: trigger
	// 		})
	// 		.addTo(scrollmagic)
	// 		.on("update", function (e) {
	// 			$("#scrollDirection").text(e.target.controller().info("scrollDirection"))
	// 		})
	// 		.on("enter leave", function (e) {
	// 			$("#state").text(e.type == "enter" ? "inside" : "outside")
	// 		})
	// 		.on("start end", function (e) {
	// 			$("#lastHit").text(e.type == "start" ? "top" : "bottom")
	// 		})
	// 		.on("progress", function (e) {
	// 			$("#progress").text(e.progress.toFixed(3))
	// 		})
	// }

	shouldComponentUpdate(nextProps, nextState) {
		const {isRouting, reduxRoute, reduxNextRoute} = this.props
		if (
				(!isRouting && nextProps.isRouting)
				|| (reduxRoute != nextProps.reduxRoute)
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
			this.enterAnim(true)
    }
  }


	enterAnim(isUpdate = true){
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
		tl.add([tweenMain], 0.3)
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

  isChanging(){
		const {isRouting, nextKind, comingFrom} = this.props
		if ( isRouting ){
			return {
				type: "leaving",
				where: nextKind,
				comingFrom: comingFrom
			}
		} else {
			return {
				type: "entering",
				where: nextKind,
				comingFrom: comingFrom
			}
		}
	}

	render() {
		const {data} = this.props
		const {
			title,
			specs, 
			miseEnBouche, 
			chapeau, 
			team, 
			description, 
			logo,
			preMess,
			theMaze
		} = data
		const event = this.isChanging()
		return (
			<div className="page" ref="main">
				<div className="body withBounds">
					<Description data={description} />
					<Logo img={logo} />
					<Specs data={specs}/>
					<MiseEnBouche data={miseEnBouche} />
					<Headline text={chapeau} />
					<PreMess data={preMess} />
				</div>
				<TheMaze title={title} data={theMaze} />
				{ (team.length > 0) && <Team data={team}/> }
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { navigationReducer} = state

  const {
    route: reduxRoute,
    routeKind: kind,
    nextRoute: reduxNextRoute,
    nextRouteKind: nextKind,
    isRouting: isRouting,
    comingFrom: comingFrom
  } = navigationReducer

  return {
    reduxRoute,
    kind,
    reduxNextRoute,
    isRouting,
    nextKind,
    comingFrom
  }
}

export default connect(mapStateToProps)(Body)