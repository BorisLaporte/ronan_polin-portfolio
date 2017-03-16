import React, { Component, PropTypes } from 'react'

import Member from './member'

class Specs extends Component {
	render() {
		const {data} = this.props
		return (
			<div className="team-container center withBounds" >
				<div className="label-container">
					<div className="label">.team</div>
				</div>
				<div className="boxes-container">
					{data.map(function(member, i){
						return <Member key={i} data={member} />
					})}
				</div>
			</div>
		)
	}
}

Specs.propTypes = {
	data: PropTypes.array.isRequired
}

export default Specs