import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'
import {setColor} from 'APP/Store/color/actions'


class Project extends Component {
	constructor(props){
		super(props)

		this.state = {
			// index: 0
		}
	}

	componentWillMount() {
		const {name} = this.props.params
		this.checkData(name)
	}

	componentDidMount() {
		this.setColor()
	}

	componentDidUpdate(prevProps, prevState) {
		this.setColor()
	}

	checkData(name){
		const {data, router} = this.props
		if ( typeof data.details[name] != "object"){
			router.push('/')
		}
	}

	setColor(){
		const {dispatch, params} = this.props
		const {color} = this.props.data.details[params.name]
		dispatch(setColor(color))
	}


	render() {
		const {name} = this.props.params
		const {title, intro, backBlur, thumbnail, square} = this.props.data.details[name]
		return (
			<div id="project" className="sub-wrapper back">
				<div className="back back-blur">
					<img src={require("IMG/"+thumbnail)} alt=""/>
				</div>
				<img src={require("IMG/"+thumbnail)} className="test" alt=""/>
				<div className={"square "+square}></div>
				<div className="content">
					<div className="main">
						<div className="title">{title}</div>
					</div>
					<div className="intro">
						<span className="what">{intro.part1}</span>
						<span className="what-again">{intro.part2}</span>
						<div className="intro-hover"></div>
					</div>
				</div>
			</div>
		)
	}
}

// <div className="back pre-thumbnail">
					// <div className="thumbnail">
						// <img src={require("IMG/"+thumbnail)} alt=""/>
						// <div className="see-more">.see-more</div>
					// </div>
				// </div>

// <img src={require("IMG/"+backBlur)} alt={title}/>

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

export default connect(mapStateToProps)(withRouter(Project))