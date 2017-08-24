import axios from 'axios'
import { browserHistory } from 'react-router'
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types'

const ROOT_URL = 'http://localhost:3090'

export function verifyUser({ email, password }, action) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/${action}`, { email, password })
      .then(response => {
        // If request is good..
        // Update state to indicate authenticated
        dispatch({ type: AUTH_USER })
        // Save jwt token
        localStorage.setItem('token', response.data.token)
        // redirect to route /feature
        browserHistory.push('/feature')
      })
      .catch(error => {
        // If request is bad..
        // Show an error to the user
        const errorMessage = error.response.data.error
        if (errorMessage) {
          dispatch(authError(error.response.data.error))
        } else {
          dispatch(authError('Invalid login details!'))
        }
      })
  }
}

export function signoutUser() {
  localStorage.removeItem('token')
  return { type: UNAUTH_USER }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
