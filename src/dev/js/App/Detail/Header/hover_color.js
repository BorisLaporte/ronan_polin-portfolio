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
		const {comingFrom} = this.props.event
		if (comingFrom == "detail"){
			this.enterAnim()
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {thumbnail, event} = this.props
		if ( nextProps.event != event || nextProps.thumbnail != thumbnail ){
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
			if (comingFrom == "detail"){
				this.enterAnim()
			}
		}
	}

	enterAnim(){
		const {tl} = this.state
		const {main} = this.refs
		const tweenMain = new TweenLite.fromTo(main, 1,
			{
				opacity:0
			},
			{
				opacity:1,
				ease: Power2.easeInOut
			})
		tl.clear()
		tl.add([tweenMain], 1)

	}

	leavingAnim(){
		const {tl} = this.state
		const {main} = this.refs
		const tweenMain = new TweenLite.to(main, 1,
			{
				opacity:0,
				ease: Power2.easeInOut
			})
		tl.clear()
		tl.add([tweenMain])
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