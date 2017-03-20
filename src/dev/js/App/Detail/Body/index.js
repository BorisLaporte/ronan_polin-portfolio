import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as ScrollMagic from 'scrollmagic'

import Logo from './logo'
import Specs from './Specs'
import MiseEnBouche from './MiseEnBouche'
import Headline from './headline'
import Team from './Team'
import PreMess from './PreMess'
import TheMaze from './TheMaze'


class Body extends Component {
	constructor(props){
		super(props)
		this.state = {
			tl: null,
			scController: null
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

	shouldComponentUpdate(nextProps, nextState) {
		const {isRouting, reduxRoute, reduxNextRoute, kind} = this.props
		if (
				(!isRouting && nextProps.isRouting)
				|| ((reduxRoute != nextProps.reduxRoute) && kind == "detail")
		){
			return true
		}
		return false
	}

  componentDidUpdate(prevProps, prevState) {
		const {isRouting} = this.props
		const {scController} = this.state
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
		tl.add([tweenMain])
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
			logo,
			preMess,
			theMaze
		} = data
		const event = this.isChanging()
		const {scController} = this.state 
		return (
			<div className="page" ref="main">
				<div className="body withBounds">
					<Logo 
						event={event} 
						img={logo} 
					/>
					<Specs 
						event={event}
						data={specs}
					/>
					<MiseEnBouche 
						event={event}
						controller={scController} 
						data={miseEnBouche} 
					/>
					<Headline 
						event={event}
						text={chapeau} 
					/>
					<PreMess 
						event={event}
						data={preMess} 
					/>
				</div>
				<TheMaze 
					event={event} 
					controller={scController} 
					title={title} 
					data={theMaze} 
				/>
				{ (team.length > 0) 
					&& 
					<Team 
						event={event}
						data={team}
					/> }
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