import React, { Component } from 'react'

import Thing from './thing'

class Block extends Component {
	render() {
		const {controller} = this.props
		const {block, imgs} = this.props.data
		return (
			<div className={"block block-"+block}>
				{imgs.map(function(_img, i){
					const extraClass = ( i > 0 ? "other" : "ref")
					return <Thing 
						img={_img} 
						controller={controller} 
						extraClass={extraClass}
						index={i}
						key={i} 
					/>
				})}
			</div>
		)
	}
}

export default Block