import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import App from './components/App'
import Welcome from './components/Welcome'

const app = (
  <BrowserRouter>
    <App>
      <Route exact path="/" component={Welcome}/>
    </App>
  </BrowserRouter>
)
ReactDOM.render(app, document.getElementById('root'))
