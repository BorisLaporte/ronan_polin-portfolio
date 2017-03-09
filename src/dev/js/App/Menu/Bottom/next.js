import React, { Component } from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

class Next extends Component {
	render() {
		return (
			<Link to="/" className="link" >
				<div>.about</div>
				<div className="looking-for">looking for a 6 month internship...</div>
			</Link>
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

export default connect(mapStateToProps)(Next)