import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'

class Content extends Component {
	render() {
		const {title, intro} = this.props.data
		return (
			<div className="content" ref="container">
				<div className="main">
					<div className="title" ref="title">{title}</div>
				</div>
				<div className="intro">
					<span className="line">{intro.part1}</span>
					<span className="line">{intro.part2}</span>
					<div className="intro-hover"></div>
				</div>
			</div>
		)
	}
}

export default withRouter(Content)
