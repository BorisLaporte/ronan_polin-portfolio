import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {TimelineLite, TweenLite, Power2} from 'gsap'
import {PORTRAIT, LANDSCAPE} from 'APP/Store/responsive/actions'

import Element from './element'

class Square extends Component {
	constructor(props){
		super(props)

		this.state = {
			tl: null,
			index: null,
			size: 0,
			clonesLength: 0
		}
	}

	componentWillMount() {
		this.setState({tl: new TimelineLite()})
		this.initData()
	}

	initData(){
		const {projects, actual} = this.props
		const index = projects.lastIndexOf(actual)
		this.setState({
			index: index,
			size: projects.length,
			clonesLength: Math.ceil(projects.length / 2)
		})
	}

	componentDidMount() {
		this.initScroller()
		this.enterAnim()
	}

	initScroller(){
		const {tl, size, index, clonesLength} = this.state
		const {main} = this.refs
		const distance = (clonesLength + index) * -100
		tl.set(main, {y:distance+"%"})
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {event, color} = this.props
		if ( nextProps.event != event || color != nextProps.color ){
			return true
		}
		return false
	}

	componentDidUpdate(prevProps, prevState) {
		this.handleAnimations()
	}

	handleAnimations(){
		const {type, where, direction} = this.props.event
		const {main} = this.refs
		const {size, index} = this.state
		if ( type == "leaving" ){
			if ( where == "projects" ){
				this.switchAnim(direction)
			} else {
				this.leaveAnim()
			}
		} else if ( type == "entering" ){
			// this.enterAnim(true)
			if ( this.onEdge(index)){
				this.recenterScroller(index)
			}
		}
	}

	recenterScroller(index){
		const {size, tl} = this.state
		const {main} = this.refs
		let newIndex
		let distance
		if ( index > size ){
			distance = size * 100
			newIndex = index - size
		} else {
			distance = size * -100
			newIndex = index + size
		}
		TweenLite.set(main,{y:'+='+distance+"%"})
		this.setState({index: newIndex})
	}

	onEdge(index){
		const {size, clonesLength} = this.state
		if ( index > -clonesLength && index < (size + clonesLength) - 1){
			return false
		}
		return true
	}

	switchAnim(direction){
		const {tl, index, size, clonesLength} = this.state
		const {main} = this.refs
		const newIndex = index+direction
		this.setState({index: newIndex})

		const distance = (newIndex + clonesLength) * -100
		const tweenMain = new TweenLite.to(main, 1.6,
			{
				y: distance+"%",
				ease: Power2.easeOut
			})
		tl.clear()
		tl.add([tweenMain], 0.5)
	}

	enterAnim(){
		const {tl} = this.state
		const {main} = this.refs
		const {yPercent} = main._gsTransform
		const tweenMain = new TweenLite.fromTo(main, 0.6,
				{
					y: '+='+30+"%",
					opacity:0
				},
				{
					y: yPercent+"%",
					opacity:1,
					ease: Power2.easeOut
				})
		tl.clear()
		tl.add([tweenMain], 1.1)
	}

	leaveAnim(){
		const {tl} = this.state
		const {main} = this.refs
		const {yPercent} = main._gsTransform
		const tweenMain = new TweenLite.to(main, 0.6,
				{
					y: '+='+30+"%",
					opacity:0,
					ease: Power2.easeOut
				})
		tl.clear()
		tl.add([tweenMain], 0.1)
	}

	getClones(projects){
		const {clonesLength} = this.state
		const size = projects.length
		let clonesAfter = projects.slice(0, clonesLength)
		let clonesBefore = projects.slice(-clonesLength)
		return {clonesBefore: clonesBefore, clonesAfter: clonesAfter}
	}

	render() {
		const {data, actual, projects, color} = this.props
		const {clonesBefore, clonesAfter} = this.getClones(projects)
		const elements = clonesBefore.concat(projects.concat(clonesAfter))
		return (
			<div className={"square-wrapper "+color} ref="main">
				{ elements.map(function(name,i){
					return <Element key={i} kind={data[name].square}/>
				})}
			</div>
		)
	}
}

Square.propTypes = {
	event: PropTypes.object
}

function mapStateToProps(state) {
  const { colorReducer} = state
  const { responsiveReducer} = state
  const { projectAnimationReducer} = state

  const {
    color: color
  } = colorReducer

  const {
    timers: timers
  } = projectAnimationReducer

  const {
		orientation: orientation,
		thumbnailSize: thumbnailSize
  } = responsiveReducer

  return {
    color,
    orientation,
    thumbnailSize,
    timers
  }
}

export default connect(mapStateToProps)(Square)