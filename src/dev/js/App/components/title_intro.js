import React, { Component } from 'react'

export default class TitleIntro extends Component {
	render() {
		const {title, intro} = this.props
		return (
			<div className="content" ref="main">
				<div className="main">
					<div className="title" ref="title">{title}</div>
					<div className="intro">
						<span className="line">{intro.part1}</span>
						<span className="line">{intro.part2}</span>
						<div className="intro-hover"></div>
					</div>
				</div>
			</div>
		)
	}
}

Content.propTypes = {
	title: PropTypes.string.isRequired,
	intro: PropTypes.string.isRequired
}

