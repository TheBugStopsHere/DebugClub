import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserInfo = props => {
  const {firstName, imageURL, email, admin} = props

  return (
    <div>
    <div className='flex'>
      <img src={imageURL} width="200" />
      <h1>{(firstName)}, how would you like to update your information?</h1>
      

      {/* This is the admin section */}
      {admin 
      ? (
        <div>
          <small><p>You are an <strong>admin</strong> user!</p></small>
          <h4>Is this user an admin user?</h4>
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

export default connect(mapState)(UserInfo)

/**
 * PROP TYPES
 */
UserInfo.propTypes = {
  firstName: PropTypes.string,
  imageURL: PropTypes.string,
  email: PropTypes.string
}
