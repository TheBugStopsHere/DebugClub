import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Invenotry = props => {
  const {firstName, imageURL, email, admin} = props

  return (
    <div>
      {/* Must be admin to access this, even if route was typed in*/}
      {admin 
      ? (
        <div>
          <h1>Inventory</h1>
        </div>
      ) 
      : ''}
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

export default connect(mapState)(Invenotry)

/**
 * PROP TYPES
 */
Invenotry.propTypes = {
  firstName: PropTypes.string,
  imageURL: PropTypes.string,
  email: PropTypes.string
}
