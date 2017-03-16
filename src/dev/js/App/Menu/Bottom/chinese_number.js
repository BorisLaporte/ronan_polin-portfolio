import React, { Component, PropTypes } from 'react'
import {browserHistory} from 'react-router'

export default class ChineseNumber extends Component {
	constructor(props){
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(e){
		const {link} = this.props
		e.preventDefault()
		browserHistory.push(link)
	}

	render() {
		const {number, link, active} = this.props
		return (
			<a
        href="#" 
        className={"chinese-number n-"+number+" "+active}
        onClick={this.handleClick}
      >
				{(number >= 0) && <div className="chinese-string" ></div>}
				{(number >= 1) && <div className="chinese-string" ></div>}
				{(number >= 2) && <div className="chinese-string" ></div>}
      </a>
		)
	}
}

ChineseNumber.propTypes = {
	number: PropTypes.number.isRequired,
	link: PropTypes.string.isRequired,
	active: PropTypes.string.isRequired
}
