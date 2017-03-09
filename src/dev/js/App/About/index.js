import React, {Component, PropTypes} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {TweenLite, TimelineLite, Power2} from 'gsap'
import {itWillPush, DID_PUSH} from 'APP/Store/navigation/actions'

class About extends Component {
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
    // console.log(router)
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
		const {about} = this.refs
		tl.clear()
		const body = new TweenLite.to(about, 0.5,
			{	
				opacity: 0,
				ease: Power2.easeOut,
				onComplete: callback
			})
		tl.add([body])
  }

  animationEnter(){
		const {tl} = this.state
		const {about} = this.refs
		const body = new TweenLite.fromTo(about, 1,
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
		const { title, background, links, details} = this.props.data.about
		return (
			<div id="about" className="sub-wrapper" ref="about">
				<img className="background" src={require("IMG/"+background)} alt="about" />
				<div className="content">
					<div className="main">
						<div className="title">{title}</div>
						<div className="links">
							{ links.map(function(link, i){
								return <a key={i} href={link.url}>{link.name}</a>
							})}
						</div>
					</div>
					<div className="details">
						<div className="hi">{details.hi}</div>
						<div className="who-am-i">
							{details.whoAmI} 
							<a target="_blank" href={details.school.url} className="school">
							{details.school.name}
							</a>
							{details.doingWhat}
						</div>
						<div className="internship">{details.internship}</div>
						<div className="contact">{details.contact}</div>
						<div className="mail">
							<a href={"mailto:"+details.mail}>{details.mail}</a>
						</div>
						<div className="super-awesome-dev">
							{details.developedBy}
							<a target="_blank" href={details.superAwesomeDev.url}>
								{details.superAwesomeDev.name}
							</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

About.propTypes = {
	route: PropTypes.object.isRequired,
	router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { contentReducer} = state
  const { navigationReducer} = state

  const {
    items: data
  } = contentReducer

  const {
    route: reduxRoute,
    nextRoute: reduxNextRoute,
    isRouting: isRouting
  } = navigationReducer

  return {
    data,
    reduxRoute,
    reduxNextRoute,
    isRouting
  }
}

export default connect(mapStateToProps)(withRouter(About))