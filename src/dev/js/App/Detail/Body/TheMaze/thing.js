import React, { Component } from 'react'

class Thing extends Component {
	render() {
		const {block, imgs} = this.props.data
		return (
			<div className={"block block-"+block}>
				{imgs.map(function(_img, i){
					const extraClass = ( i > 0 ? "other" : "ref")
					return (
					<div 
						key={i}
						className={"thing n-"+i+" "+_img.kind+" "+extraClass}
					>
						<img src={require("IMG/"+_img.url)}/>
					</div>)
				})}
			</div>
		)
	}
}

export default Thing