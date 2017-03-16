import React, { Component } from 'react'

import Thing from './thing'

class TheMaze extends Component {
	render() {
		const {data, title} = this.props
		const {front, back} = data
		return (
			<div className={"the-maze the-maze-of-"+title}>
				<div className="front center">
					{front.map(function(_front, i){
						return <Thing data={_front} key={i} />
					})}
				</div>
				{ (back == "lol") &&
					<div className="back center">
						{back.map(function(_back, i){
							return <Thing data={_back} key={i} />
						})}
					</div>
				}
			</div>
		)
	}
}

export default TheMaze