import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, Redirect, browserHistory, IndexRoute} from 'react-router'

import 'SASS/main.scss'
import App from './App'
import configureStore from './App/Store'
import Home from './App/Home'
import About from './App/About'
import Project from './App/Project'
import Detail from './App/Detail'

const store = configureStore()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
			<Route path="/" component={App} >
				<IndexRoute name="home" component={Home} />
				<Route name="about" path="about" component={About} />
				<Route path="projects/:name" component={Project} />
				<Route path="projects/:name/detail" component={Detail} />
				<Redirect from="*" to="/" />
      </Route>
		</Router>
  </Provider>,
  document.getElementById('container')
)