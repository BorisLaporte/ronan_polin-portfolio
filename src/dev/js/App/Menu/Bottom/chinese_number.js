import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'

export default class ChineseNumber extends Component {
	render() {
		const {number, link, active} = this.props
		return (
			<Link
        to={link} 
        className={"chinese-number n-"+number+" "+active}
      >
				{(number >= 0) && <div className="chinese-string" ></div>}
				{(number >= 1) && <div className="chinese-string" ></div>}
				{(number >= 2) && <div className="chinese-string" ></div>}
      </Link>
		)
	}
}

ChineseNumber.propTypes = {
	number: PropTypes.number.isRequired,
	link: PropTypes.string.isRequired,
	active: PropTypes.string.isRequired
}
