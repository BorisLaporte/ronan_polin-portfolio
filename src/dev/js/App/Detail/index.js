import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {browserHistory, withRouter} from 'react-router'


class Detail extends Component {
	constructor(props){
		super(props)

		this.state = {
			// index: 0
		}
	}

	componentDidMount() {
		console.log(this.props)
	}

	componentDidUpdate(prevProps, prevState) {
	
	}


	render() {
		return (
			<div>DETAIL</div>
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