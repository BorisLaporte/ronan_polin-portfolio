import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import PreloadReact from './Preload'
import {fillContent} from './Store/content/actions'
import {setupRoutes} from './Store/navigation/actions'
import {getWindowSize} from './Store/responsive/actions'
import {setupTimers} from './Store/projectAnimation/actions'

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
		const {dispatch, location} = this.props
		dispatch(setupRoutes(location.pathname))
    dispatch(getWindowSize())
    dispatch(setupTimers())
  }

	componentDidMount() {
		const {dispatch} = this.props
		this.fillJson(json)
    this.setListenerResponsive()
	}

	setListenerResponsive(){
    const self = this
    const { dispatch } = this.props
    window.onresize = () => {
      dispatch(getWindowSize())
    }
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
		const {children, data} = this.props
    return (
      <div className="wrapper">
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

  const {
    items: data
  } = contentReducer

  return {
    data
  }
}

export default connect(mapStateToProps)(withRouter(App))
