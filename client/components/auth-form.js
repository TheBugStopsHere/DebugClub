import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="loginSignup">
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' ? (
          <div className="signupInputs">
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
            <div>
              <label htmlFor="imageURL">
                <small>Image URL</small>
              </label>
              <input name="imageURL" type="text" />
            </div>
            <div>
              <label htmlFor="address">
                <small>Address</small>
              </label>
              <input name="address" type="text" />
            </div>
          </div>
        ) : (
          ''
        )}
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div className="submitLogin">
          <button className="submitLoginBtn btn btn-info btn-md" type="submit">
            {displayName}
          </button>
        </div>
        {name === 'login' ? (
          <div id="notMem">
            <h2>
              Not a member?{' '}
              <Link to="/signup" id="signupLink">
                Sign Up
              </Link>
            </h2>
          </div>
        ) : (
          ''
        )}
        {error && error.response && <div>{error.response.data} </div>}
      </form>
      <a id="googleLogin" href="/auth/google">
        {displayName} with Google!
      </a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const method = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      let firstName, lastName, imageURL, address
      if (method === 'signup') {
        firstName = evt.target.firstName.value
        lastName = evt.target.lastName.value
        imageURL = evt.target.imageURL.value
        address = evt.target.address.value
      }
      const formdata = {
        email,
        password,
        method,
        firstName,
        lastName,
        imageURL,
        address
      }
      dispatch(auth(formdata))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
