import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, imageURL, email, admin} = props

  return (
    <div id="profileContainer">
      <div className="flex">
        <img id="profilePic" src={imageURL} width="200" />
        <h1>Welcome back, {firstName || email}!</h1>{' '}
        <Link to="update">
          <button id="updateInfoBtn" type="button">
            {' '}
            Update My Information{' '}
          </button>
        </Link>{' '}
        <Link to="orders">
          <button id="orderHistBtn" type="button">
            {' '}
            My Orders{' '}
          </button>
        </Link>
        <br />
        <br />
        {admin ? (
          <div>
            <small>
              <p>
                You are an <strong>admin</strong> user!
              </p>
            </small>
            <h3>Admin Actions</h3>
            <Link to="inventory">
              <button type="button"> Update Inventory </button>
            </Link>{' '}
            <Link to="update">
              <button type="button"> Update A User's Information </button>
            </Link>{' '}
            <Link to="orders">
              <button type="button"> All Order History </button>
            </Link>
          </div>
        ) : (
          ''
        )}
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
