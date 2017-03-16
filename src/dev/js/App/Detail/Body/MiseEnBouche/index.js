import React, { Component, PropTypes } from 'react'

import BundleImg from './bundle_img'
import BundleText from './bundle_text'

class MiseEnBouche extends Component {
	render() {
		const {imgContext, whatIs, quote} = this.props.data
		return (
			<div className="mise-en-bouche" >
				<BundleImg imgs={imgContext} />
				<BundleText whatIs={whatIs} quote={quote}/>
			</div>
		)
	}
}

export default MiseEnBouche