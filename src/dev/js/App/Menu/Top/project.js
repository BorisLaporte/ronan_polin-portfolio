import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter, browserHistory } from 'react-router'
import {TimelineLite, TweenLite, Power2} from 'gsap'

class Project extends Component {
	constructor(props){
		super(props)

		this.state = {
      tl: null,
      prefix: '/projects/'
		}

		this.handleClick = this.handleClick.bind(this)
	}

	componentWillMount() {
    this.setState({tl: new TimelineLite()})
  }

  componentWillUpdate(nextProps, nextState) {
    if ( nextProps.isRouting && nextProps.nextKind != "detail"){
      this.leavingAnim()
    }
  }

  componentDidMount() {
    this.enteringAnim()
  }

  handleClick(e) {
    const {prefix} = this.state
    const {name} = this.props.params
    e.preventDefault()
    this.leavingAnim(() => {
			browserHistory.push(prefix+name)
    })
  }

  enteringAnim(){
		const {tl} = this.state
    const {container} = this.refs
    tl.from(container, 1,
    {
      opacity: 0,
      x:10,
      ease: Power2.easeOut
    })
  }

  leavingAnim(callback = null){
    const {tl} = this.state
    const {container} = this.refs
    const tweenContainer = new TweenLite.to(container, 1,
			{
				opacity:0,
				x:-20,
				ease: Power2.easeOut
			})
    tl.add([tweenContainer]).pause()
    if ( callback != null ){
      tl.add(callback, "-=0.8")
    }
    tl.play()
  }

	render() {
		return (
			<a href="#" className="link project" onClick={this.handleClick} ref="container" >.project</a>
		)
	}
}

function mapStateToProps(state) {
  const { navigationReducer} = state


  const {
    isRouting: isRouting,
    nextRouteKind: nextKind,
    routeKind: kind
  } = navigationReducer

  return {
    isRouting,
    nextKind,
    kind
  }
}


export default connect(mapStateToProps)(withRouter(Project))
