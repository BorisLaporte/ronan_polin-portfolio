import React, { Component } from 'react'

import OneSpec from './one_spec'

class Parameters extends Component {
	render() {
		const {context, role, time} = this.props.data
		return (
			<div className="boxes-container" >
				<OneSpec title={".role"} value={role}/>
				<OneSpec title={".time"} value={time}/>
				<OneSpec title={".context"} value={context}/>
			</div>
		)
	}
}


export default Parameters
