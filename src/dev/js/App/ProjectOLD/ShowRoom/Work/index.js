import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter, browserHistory} from 'react-router'
import BackBlur from './back_blur'
import Content from './content'

class Work extends Component {
	render() {
		const {data, params} = this.props
		return (
			<div className="section" ref="main">
				<BackBlur img={data.thumbnail}/>
				<Content data={data}/>
			</div>
		)
	}
}

export default withRouter(Work)
