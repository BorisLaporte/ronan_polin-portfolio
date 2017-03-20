import React, { Component } from 'react'
import {connect} from 'react-redux'
import {PORTRAIT, LANDSCAPE} from 'APP/Store/responsive/actions'

class Element extends Component {
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
		// this.squareSetDefaultPos()
	}

	squareSetDefaultPos(){
		const {orientation, thumbnailSize, height, width} = this.props
		const yPos =  (height/2) - (thumbnailSize/2) + 65
		let xPos
		if ( orientation == LANDSCAPE ){
			xPos =  (width/2) - (thumbnailSize + 40) + 65
		} else {
			xPos =  width/2 - thumbnailSize + 65
		}
		this.squareSetPos(xPos, yPos)
	}

	squareSetPos(xPos, yPos){
		const {tl} = this.state
		const {square} = this.refs
		tl.clear()
		tl.set(square,
			{
				x: xPos+"px",
				y: yPos+"px"
			})
	}

	render() {
		const {kind, squareSize} = this.props
		return (
			<div className="section">
				<div 
					className={"square "+kind} 
					ref="square"
				></div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { responsiveReducer} = state

  const {
		width: width,
		height: height,
		orientation: orientation,
		squareSize: squareSize,
		thumbnailSize: thumbnailSize
  } = responsiveReducer

  return {
    squareSize,
    orientation,
    thumbnailSize,
    width,
    height
  }
}

export default connect(mapStateToProps)(Element)