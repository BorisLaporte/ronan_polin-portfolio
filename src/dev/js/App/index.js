import React, {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import configureStore from 'STORE'
// import 'IMG/cafe.jpg'

const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
					<Route path="/" component={<div></div>} />
				</Router>
      </Provider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
}