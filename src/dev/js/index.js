import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'

import 'SASS/main.scss'
import App from './App'

render(
  <App/>,
  document.getElementById('container')
)