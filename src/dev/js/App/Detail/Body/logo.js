import React, { Component, PropTypes } from 'react'

class Logo extends Component {
	render() {
		const {img} = this.props
		return (
			<img src={require("IMG/"+img)} alt="logo" className="logo center"/>
		)
	}
}

Logo.proptypes = {
	img: PropTypes.string.isRequired
}

export default Logo