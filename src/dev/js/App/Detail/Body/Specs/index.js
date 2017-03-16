import React, { Component, PropTypes } from 'react'

import Parameters from './parameters'

class Specs extends Component {
	render() {
		const {data} = this.props
		return (
			<div className="specs-container" >
				<Parameters data={data}/>
			</div>
		)
	}
}

Specs.propTypes = {
	data: PropTypes.object.isRequired
}

export default Specs