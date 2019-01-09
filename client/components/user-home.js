import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllItems from './All-Items';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, imageURL, email, admin} = props

  return (
    <div>
    <div className='flex'>
      <img src={imageURL} width="200" />
      <h1>Welcome back, {(firstName || email)}!</h1>
      {admin 
      ? (
        <div>
          <small><p>You are an <strong>admin</strong> user!</p></small>
        </div>
      ) 
      : ''}
      
    </div>
  </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName,
    imageURL: state.user.imageURL,
    email: state.user.email,
    admin: state.user.admin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
  imageURL: PropTypes.string,
  email: PropTypes.string
}
