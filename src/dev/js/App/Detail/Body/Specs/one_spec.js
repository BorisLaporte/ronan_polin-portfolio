import React, { Component, PropTypes } from 'react'

class OneSpec extends Component {
	render() {
		const {title, value} = this.props
		return (
			<div className="box" >
				<div className="label-container">
					<div className="label">{title}</div>
				</div>
				<div className="value">{value}</div>
			</div>
		)
	}
}

OneSpec.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired
}

export default OneSpec