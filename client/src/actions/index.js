import axios from 'axios'
import { AUTH_USER } from './types'

// redux thunk allows us to return a function instead of an action object
// like { type: AUTH_USER, payload: 'blahblah' }
export const signup = (formProps) => dispatch => {
  axios.post('http://localhost:3090/signup', formProps)
}
