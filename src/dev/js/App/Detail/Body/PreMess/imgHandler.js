import React, { Component } from 'react'

import OneImg from './one_img'

class ImgHandler extends Component {
	render() {
		const {imgs} = this.props
		return (
			<div className={"img-handler center img-"+imgs.length}>
				{imgs.map(function(_img, i){
					return <OneImg img={_img} key={i}/>
				})}
			</div>
		)
	}
}

export default ImgHandler