import axios from 'axios'
import { AUTH_USER, AUTH_ERROR } from './types'

// redux thunk allows us to return a function instead of an action object
// like { type: AUTH_USER, payload: 'blahblah' }
export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3090/signup', formProps)
    dispatch({type: AUTH_USER, payload: response.data.token})
    localStorage.setItem('token', response.data.token)
    callback()
  } catch(err) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' })
  }
}
