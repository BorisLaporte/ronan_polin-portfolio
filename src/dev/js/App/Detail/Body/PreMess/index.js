import React, { Component } from 'react'

import ImgHandler from './imgHandler'

class PreMess extends Component {
	render() {
		const {imgs, link, text} = this.props.data
		return (
			<div className="center pre-mess">
				<ImgHandler imgs={imgs} />
				<div className="text">
					{text} 
					{ (link != null) && <a target="_blank" href={link.url}>{link.name}</a>}
				</div>
			</div>
		)
	}
}

export default PreMess