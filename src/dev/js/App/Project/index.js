import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'
import {TimelineLite, TweenLite, Power2} from 'gsap'
import {setColor, BLACK} from 'APP/Store/color/actions'
import {itWillPush, DID_PUSH} from 'APP/Store/navigation/actions'

import Work from './Work'

class Project extends Component {
  constructor(props){
    super(props)

    this.state = {
      tl: null,
      index: 0,
      isScrolling: false,
      readyForNext: false,
      nextName: null,
      timeout: null,
      prefix: "/projects/",
      reg: /^\/projects\/[a-zA-Z0-9]*\/?$/,
    }

    this.routerWillLeave = this.routerWillLeave.bind(this)
    this.onScroll = this.onScroll.bind(this)
  }

  componentWillMount() {
    this.setState({tl: new TimelineLite()})
  }

  componentDidMount() {
    const {router, route} = this.props
    const self = this
    if ( this.checkData() ){
      const index = this.getIndex()
      router.setRouteLeaveHook(route, this.routerWillLeave)
      setTimeout(function() {
        window.addEventListener('wheel', self.onScroll)
      }, 1700)
      // this.setInitScroll(index)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {reduxNextRoute, reduxRoute, nextRouteKind, isRouting}= this.props
    const {readyForNext}= this.state
    if ( !isRouting ){
      if ( 
        (nextProps.reduxNextRoute != reduxNextRoute)
        ||(readyForNext)
      ){
        return true
      }
    } else if (nextProps.reduxRoute != reduxRoute) {
      return true
    }
    return false
  }

  componentDidUpdate(prevProps, prevState) {
    const {isRouting, nextRouteKind, data, reduxNextRoute} = this.props
    if ( isRouting ){
      const nextName = reduxNextRoute.substring(reduxNextRoute.lastIndexOf('/') + 1)
      this.setState({nextName: nextName})
    }
  }

  componentWillUnmount() {
    const {dispatch} = this.props
    window.removeEventListener('wheel', this.onScroll)
    dispatch(setColor(BLACK))
  }


  checkData(){
    const {params, data, router} = this.props
    if ( typeof data.details[params.name] != "object"){
      router.push('/')
      return false
    }
    return true
  }

  getIndex(path = null){
    const {params, data} = this.props
    let name
    if ( path != null ){
      name = path.substring(path.lastIndexOf('/') + 1)
    } else {
      name = params.name
    }
    const index = data.details[name].index
    return index
  }

  getDirection(path){
    const {params, data} = this.props
    let actualIndex = this.getIndex()
    let nextIndex = this.getIndex(path)
    let direction = nextIndex - actualIndex
    if ( direction == 2 ){
      direction = -1
    } else if ( direction == -2 ){
      direction = 1
    }
    return direction
  }

  nextIndex(direction){
    const {data, params} = this.props
    const max = data.projects.length - 1
    const index = this.getIndex()
    let nextIndex = index + direction
    if ( nextIndex < 0 ){
      nextIndex = max
    } else if ( nextIndex > max ) {
      nextIndex = 0
    }
    return nextIndex
  }

  onScroll(e){
    e.preventDefault()
    const {deltaY} = e
    const {isScrolling} = this.state
    if ( !isScrolling ){
      if ( deltaY >= 30 ){
        const nextIndex = this.nextIndex(1)
        this.scrollToNext(nextIndex)
      } else if ( deltaY <= -30 ){
        const nextIndex = this.nextIndex(-1)
        this.scrollToNext(nextIndex)
      }
    }
  }

  scrollToNext(nextIndex){
    const {data, timers} = this.props
    const {prefix, scrollTime, scroll} = this.state
    const nextProject = data.projects[nextIndex]
    browserHistory.push(prefix+nextProject)
    this.setState({isScrolling: true})
    const self = this
    clearTimeout(scroll)
    this.state.scroll = setTimeout(function() {
      self.setState({isScrolling: false})
    }, 800 )
  }

  routerWillLeave(nextLocation) {
    const {readyForNext, reg, timeout} = this.state
    const {dispatch, timers} = this.props
    const self = this
    if ( readyForNext ){
      this.setState({readyForNext: false})
      return true
    } else if ( reg.test(nextLocation.pathname) ) {
      const direction = this.getDirection(nextLocation.pathname)
      const nextName = nextLocation.pathname.substring(nextLocation.pathname.lastIndexOf('/') + 1)
      this.setState({nextName: nextName})
      dispatch(itWillPush(nextLocation.pathname, "projects", direction))
      clearTimeout(timeout)
      this.state.timeout = setTimeout(function() {
        self.setAndGo(nextLocation.pathname)
      }, 1300)
      return false
    } else {
      dispatch(itWillPush(nextLocation.pathname, "projects"))
      clearTimeout(timeout)
      window.removeEventListener('wheel', this.onScroll)
      this.state.timeout = setTimeout(function() {
        self.setAndGo(nextLocation.pathname)
      }, (1400))
      return false
    }
  }

  setAndGo(next){
    const {router, dispatch} = this.props
    this.setState({readyForNext: true})
    router.push(next)
    dispatch({ type: DID_PUSH })
  }

  scrollAnimation(index, callback = null){
    const {tl, scrollTime} = this.state
    const {scroll} = this.refs
    const time = 0.8
    const tweenScroll = new TweenLite.to(scroll, time,
      {
        y: index * -100+"%",
        ease: Power2.easeInOut
      })
    tl.clear()
    tl.add([tweenScroll])
    if ( callback != null ){
      tl.add(callback, "-="+time-0.1)
    }
  }

  isLeaving(){
    const {isRouting, nextRouteKind} = this.props
    if ( isRouting ){
      return nextRouteKind
    }
    return null
  }

	render() {
    const {nextName} = this.state
		const {projects, details} = this.props.data
    const {name} = this.props.params
		return (
      <div id="project" className="sub-wrapper fullscreen hidden" ref="main">
        <Work data={details} actual={name} next={nextName} projects={projects}/>
      </div>
		)
	}
}


function mapStateToProps(state) {
  const { contentReducer} = state
  const { navigationReducer} = state
  const { projectAnimationReducer} = state

  const {
    items: data
  } = contentReducer

  const {
    timers: timers
  } = projectAnimationReducer

  const {
    route: reduxRoute,
    nextRoute: reduxNextRoute,
    nextRouteKind: nextRouteKind,
    isRouting: isRouting
  } = navigationReducer

  return {
    data,
    reduxRoute,
    reduxNextRoute,
    isRouting,
    nextRouteKind,
    timers
  }
}

export default connect(mapStateToProps)(withRouter(Project))