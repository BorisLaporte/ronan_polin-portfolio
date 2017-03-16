import React, { Component } from 'react'

class BundleText extends Component {
	render() {
		const {whatIs, quote} = this.props
		return (
			<div className="bundle-text center">
				<div className="what-is">{whatIs}</div>
				<div className="quote">{quote}</div>
			</div>
		)
	}
}

export default BundleText