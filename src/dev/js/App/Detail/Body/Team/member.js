import React, { Component } from 'react'

class Member extends Component {
	render() {
		const {name, role} = this.props.data
		return (
			<div className="box">
				<div className="value">
					<div className="name">{name}</div>
					<div className="role">{role}</div>
				</div>
			</div>
		)
	}
}

export default Member