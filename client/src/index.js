import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'

import reducers from './reducers'
import App from './components/App'
import Welcome from './components/Welcome'
import Signup from './components/auth/Signup'
import Signout from './components/auth/Signout'
import Signin from './components/auth/Signin'
import Feature from './components/Feature'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token') }
  },
  composeEnhancers(
    applyMiddleware(reduxThunk))
)

const app = (
  <Provider store={store}>
  <BrowserRouter>
    <App>
      <Route exact path="/" component={Welcome}/>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signout" component={Signout} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/feature" component={Feature} />
    </App>
  </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
