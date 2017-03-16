import React, { Component, PropTypes } from 'react'

class Description extends Component {
	render() {
		const {part1, part2, link} = this.props.data
		return (
			<div className="description" >
				<div className="main">
					<div className="part part-1">{part1}</div>
					<div className="part part-2">{part2}</div>
					{ 
						(link != null) 
						&&  
						<a target="_blank" href={link.url} className="link">{link.text}</a>
					}
				</div>
			</div>
		)
	}
}

Description.proptypes = {
	data: PropTypes.object.isRequired
}

export default Description