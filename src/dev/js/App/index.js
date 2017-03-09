import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import PreloadReact from './Preload'
import {fillContent} from './Store/content/actions'

import Menu from './Menu'
import json from 'SRC/data.json'

class App extends Component {
	constructor(props){
		super(props)

		this.state = {
			ready: false
		}

		this.letsGo = this.letsGo.bind(this)
	}

	componentWillMount() {
  }

	componentDidMount() {
		this.fillJson(json)
	}

	componentDidUpdate(prevProps, prevState) {

	}

	letsGo(){
		this.setState({ready: true})
	}

	fillJson(json){
		const {dispatch} = this.props
		if (typeof json === "object" ){
			dispatch(fillContent(json))
		} else if ( typeof json === "string" ){
			dispatch(fillContent(JSON.parse(json)))
		}
	}

  render() {
		const {ready} = this.state
		const {children, data, color} = this.props
    return (
      <div className={"wrapper "+color}>
				<PreloadReact 
					data={data}
					children={children}
					onSuccess={this.letsGo}
        />
        { ready && <Menu /> }
      </div>
    )
  }
}



function mapStateToProps(state) {
  const { contentReducer} = state
  const { colorReducer} = state

  const {
    items: data
  } = contentReducer

  const {
    color: color
  } = colorReducer

  return {
    data,
    color
  }
}


export default connect(mapStateToProps)(App)
