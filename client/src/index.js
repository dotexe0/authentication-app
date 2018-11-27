import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducers from './reducers'
import App from './components/App'
import Welcome from './components/Welcome'
import Signup from './components/auth/Signup'

const app = (
  <Provider store={createStore(reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
  <BrowserRouter>
    <App>
      <Route exact path="/" component={Welcome}/>
      <Route exact path="/signup" component={Signup} />
    </App>
  </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
