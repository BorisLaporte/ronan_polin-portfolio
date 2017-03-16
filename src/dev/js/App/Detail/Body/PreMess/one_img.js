import React, { Component } from 'react'

class OneImg extends Component {
	render() {
			const {img} = this.props
		return (
			<div className="one-img">
				<img src={require("IMG/"+img)}/>
			</div>
		)
	}
}

export default OneImg