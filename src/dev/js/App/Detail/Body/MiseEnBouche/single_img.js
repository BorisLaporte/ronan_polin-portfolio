import React, { Component } from 'react'

class SingleImg extends Component {
	render() {
		const {img} = this.props
		return (
			<div className="single-img">
				<img 
					src={require('IMG/'+img)}
				/>
			</div>
		)
	}
}

export default SingleImg