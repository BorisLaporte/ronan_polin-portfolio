import React, { Component, PropTypes } from 'react'

import BundleImg from './bundle_img'
import BundleText from './bundle_text'

class MiseEnBouche extends Component {
	render() {
		const {data, controller} = this.props
		const {imgContext, whatIs, quote} = data
		return (
			<div className="mise-en-bouche" >
				<BundleImg imgs={imgContext} controller={controller} />
				<BundleText whatIs={whatIs} quote={quote}/>
			</div>
		)
	}
}

export default MiseEnBouche