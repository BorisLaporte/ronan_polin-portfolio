import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'
import {TimelineLite, TweenLite, Power2} from 'gsap'
import {setColor, BLACK} from 'APP/Store/color/actions'
import {itWillPush, DID_PUSH} from 'APP/Store/navigation/actions'

import Body from './Body'
import Header from './Header'

class Detail extends Component {
	constructor(props){
		super(props)

		this.state = {
			readyForNext: false,
			timeout: null
		}

		this.routerWillLeave = this.routerWillLeave.bind(this)
	}

	componentDidMount() {
		const {router, route} = this.props
    if ( this.checkData() ){
      router.setRouteLeaveHook(route, this.routerWillLeave)
    }
	}

  shouldComponentUpdate(nextProps, nextState) {
    const {location}= this.props
    if ( location != nextProps.location ){
      return true
    }
    return false
  }

  componentDidUpdate(prevProps, prevState) {
		this.checkData()
  }

	checkData(){
    const {params, data, router} = this.props
    if ( typeof data.details[params.name] != "object"){
      router.push('/')
      return false
    }
    return true
  }

	routerWillLeave(nextLocation) {
    const {readyForNext, timeout} = this.state
    const {dispatch} = this.props
    const self = this
    if ( readyForNext ){
      this.setState({readyForNext: false})
			return true
    } else {
			dispatch(itWillPush(nextLocation.pathname, "detail"))
			clearTimeout(timeout)
			const newTimeout = setTimeout(function() {
				self.setAndGo(nextLocation.pathname)
			}, 1500)
			this.setState({timeout: newTimeout})
			return false
		}
  }

	setAndGo(next){
    const {router, dispatch} = this.props
		this.setState({readyForNext: true})
		router.push(next)
		dispatch({ type: DID_PUSH })
		window.scrollTo(0, 0)
  }

	render() {
		const {params, data} = this.props
		const actualData = data.details[params.name]
		return (
			<div id="detail" className="sub-wrapper" ref="main">
				<Header data={actualData} />
				<Body data={actualData} />
			</div>
		)
	}
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

export default connect(mapStateToProps)(withRouter(Detail))