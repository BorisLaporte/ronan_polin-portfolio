import React, { Component } from 'react'
import 'animation.gsap'
import {TimelineLite, TweenLite, Power2} from 'gsap'
import * as ScrollMagic from 'scrollmagic'

class SingleImg extends Component {
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

	getTween(){
		const {img} = this.refs
		const {size, index} = this.props
		let tweenContent
		switch(index){
			case 0:
				tweenContent = {
					x: -70,
					opacity: 0,
					ease: Power2.easeOut
				}
				break
			case 1:
				if ( size == 2 ){
					tweenContent = {
						x: 70,
						opacity: 0,
						ease: Power2.easeOut
					}
				} else {
					tweenContent = {
						y: -70,
						opacity: 0,
						ease: Power2.easeOut
					}
				}

				break
			case 2:
				tweenContent = {
					x: 70,
					opacity: 0,
					ease: Power2.easeOut
				}
				break
			default:
				tweenContent = {
					x: 70,
					opacity: 0,
					ease: Power2.easeOut
				}
				break
		}
		const tween = TweenLite.from(img, 1.5,tweenContent)
		return tween
	}

	setScene(){
		const {data, controller} = this.props
		const {img} = this.refs
		const tween = this.getTween()
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
		const {img} = this.props
		return (
			<div className="single-img" ref="img">
				<img 
					src={require('IMG/'+img)}
				/>
			</div>
		)
	}
}

export default SingleImg