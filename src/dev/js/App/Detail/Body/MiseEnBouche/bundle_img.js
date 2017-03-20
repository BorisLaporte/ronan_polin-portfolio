import React, { Component, PropTypes } from 'react'
import SingleImg from './single_img'

class BundleImg extends Component {

	render() {
		const {imgs, controller} = this.props
		return (
			<div className={"bundle-img center bundle-"+imgs.length}>
				{imgs.map(function(_img, i){
					return <SingleImg 
						img={_img} 
						size={imgs.length} 
						index={i}
						controller={controller} 
						key={i}
					/>
				})}
			</div>
		)
	}
}

export default BundleImg