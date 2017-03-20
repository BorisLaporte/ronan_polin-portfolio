import React, { Component, PropTypes } from 'react'

class Description extends Component {
	constructor(props){
		super(props)

		this.state = {
			tl: null
		}
	}

	componentWillMount() {
		this.setState({tl: new TimelineLite()})
	}

	componentDidMount() {
		const {comingFrom} = this.props.event
		if ( comingFrom == "projects" ){
				this.enterAnim(true)
			} else {
				this.enterAnim(false)
			}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {title, color, intro, event} = this.props
		if ( nextProps.event != event 
			|| nextProps.title != title 
			|| nextProps.intro != intro 
			|| nextProps.color != color 
		){
			return true
		}
		return false
	}

	componentDidUpdate(prevProps, prevState) {
		this.handleAnimations()
	}

	handleAnimations(){
		const {type, where, comingFrom} = this.props.event
		if ( type == "leaving" ){
			this.leavingAnim()
		} else if ( type == "entering" ){
			if ( comingFrom == "projects" ){
				this.enterAnim(true)
			} else {
				this.enterAnim(false)
			}
		}
	}

	enterAnim(fromProjects){
		const {tl} = this.state
		const {main} = this.refs
		const delay = fromProjects ? 1 : 2.2
		const tweenMain = new TweenLite.fromTo(main, 1,
			{
				y: 40,
				opacity:0
			},
			{
				y:-50+"%",
				opacity:1,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain], delay)
	}

	leavingAnim(){
		const {tl} = this.state
		const {main} = this.refs
		const tweenMain = new TweenLite.to(main, 1,
			{
				y: 40,
				opacity:0,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain])
	}


	render() {
		const {part1, part2, link} = this.props.data
		return (
			<div className="description" ref="main">
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