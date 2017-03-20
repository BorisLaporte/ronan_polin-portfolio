import React, { Component } from 'react'
import 'animation.gsap'
import {TimelineLite, TweenLite, Power2} from 'gsap'
import * as ScrollMagic from 'scrollmagic'

class Thing extends Component {
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

	componentDidMount() {
		this.setScene()
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props != nextProps){
			return true
		}
		return false
	}

	componentDidUpdate(prevProps, prevState) {
		const {scene} = this.state
		scene.destroy()
		this.setScene()
	}

	componentWillUnmount() {
		const {scene} = this.state
		scene.destroy()
	}

	setScene(){
		const {data, controller} = this.props
		const {img} = this.refs
		const tween = TweenLite.from(img, 1.5,{
				y: 50,
				opacity: 0,
				ease: Power2.easeOut
			})
		const scene = new ScrollMagic.Scene({
				triggerElement: img,
				triggerHook: 0.7,
				reverse: false
			})
			.setTween(tween)
			.addTo(controller)
		this.setState({scene: scene})
	}

	render() {
		const {img, extraClass, index} = this.props
		return (
			<div 
				ref="img"
				className={"thing n-"+index+" "+img.kind+" "+extraClass}
			>
				<img src={require("IMG/"+img.url)}/>
			</div>
		)
	}
}

export default Thing