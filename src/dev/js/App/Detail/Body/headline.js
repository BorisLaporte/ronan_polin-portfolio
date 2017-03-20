import React, { Component, PropTypes } from 'react'

class Headline extends Component {
	render() {
		const {text} = this.props
		return (
			<h2 className="chapeau withBounds" >{text}</h2>
		)
	}
}

Headline.proptypes = {
	text: PropTypes.string.isRequired
}

export default Headline