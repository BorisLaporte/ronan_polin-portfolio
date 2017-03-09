import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import {TimelineLite, Power2} from 'gsap'

import ChineseNumber from './chinese_number'

class Projects extends Component {
	constructor(props){
		super(props)
		this.state = {
      tl: null,
      prefix: '/projects/',
      reg: /^\/projects/,
      forceActive: false
		}
	}

  shouldComponentUpdate(nextProps, nextState) {
    if ( 
      (nextProps.location.pathname != this.props.location.pathname)
      || (nextProps.reduxNextRoute != this.props.reduxNextRoute )
   ){
      return true
    }
    return false
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
      const name = nextProps.reduxNextRoute.substring(nextProps.reduxNextRoute.lastIndexOf("/") + 1)
      this.state.forceActive = name
    } else if ( !nextProps.isRouting ){
      this.state.forceActive = false
    }
  }
  
  enteringAnim(){
		const {tl} = this.state
    const {container} = this.refs
    tl.from(container, 1,
    {
      opacity: 0,
      y:10,
      ease: Power2.easeOut
    })
  }

	render() {
    const {prefix, forceActive} = this.state
		const {projects} = this.props.data
    const {name} = this.props.params
    const toCompare = !forceActive ? name : forceActive
		return (
			<div className="link projects" ref="container" >
        <div className="title">.projects</div>
        <div className="chinese-list">
          {projects.map(function(_project, i){
            const active = (toCompare == _project) ? 'active' : ''
            return <ChineseNumber 
              key={i}
              number={i} 
              link={prefix+_project}
              active={active}
            />
          })}
        </div>
			</div>
		)
	}
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


export default connect(mapStateToProps)(withRouter(Projects))
