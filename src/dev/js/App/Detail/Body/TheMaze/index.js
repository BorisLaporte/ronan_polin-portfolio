import React, { Component } from 'react'
import * as ScrollMagic from 'scrollmagic'

import Block from './block'

class TheMaze extends Component {
	constructor(props){
		super(props)

		this.state = {
			tl: null,
			scene: null
		}
	}

	componentWillMount() {
		this.setState({tl: new TimelineLite()})
	}

	shouldComponentUpdate(nextProps, nextState) {
		if ( nextProps.event.type == "entering" ){
			return true
		}
		return false
	}

	render() {
		const {data, title, controller} = this.props
		const {front, back} = data
		return (
			<div className={"the-maze the-maze-of-"+title} ref="main">
				<div className="front center">
					{front.map(function(_front, i){
						return <Block controller={controller} data={_front} key={i} />
					})}
				</div>
				
			</div>
		)
	}
}


// { (back == "lol") &&
// 					<div className="back center">
// 						{back.map(function(_back, i){
// 							return <Thing data={_back} key={i} />
// 						})}
// 					</div>
// 				}

export default TheMaze