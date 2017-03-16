import React, { Component } from 'react'

class HoverColor extends Component {
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
		// this.enterAnim()
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
		const {type, where, comingFrom, data} = this.props.event
		if ( type == "leaving" ){
			// console.log("leaving")
			this.leavingAnim()
		} else if ( type == "entering" ){
			// console.log("entering " + comingFrom)
			if (comingFrom != "projects"){
				this.enterAnim()
			}
		}
	}

	enterAnim(){
		// console.log("anim")
		const {tl} = this.state
		const {main} = this.refs
		const tweenMain = new TweenLite.fromTo(main, 2,
			{
				opacity:0
			},
			{
				opacity:1,
				ease: Power2.easeOut
				// immediateRender: false
			})
		tl.clear()
		tl.add([tweenMain], 0.1)

	}

	leavingAnim(){
		const {tl} = this.state
		const {main} = this.refs
		const tweenMain = new TweenLite.to(main, 2,
			{
				opacity:0,
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain], 0.2)
	}

	render() {
		const {thumbnail} = this.props
		return (
			<div className="thumbnail detail" ref="main" >
				<img src={require("IMG/"+thumbnail)} alt=""/>
			</div>
		)
	}
}

export default HoverColor