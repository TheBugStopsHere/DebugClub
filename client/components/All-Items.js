import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const AllItems = props => {
//   const {email} = props

  return (
    <div>
        <h1>All Items Component</h1>
      {/* <h3>Welcome, {email}</h3> */}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(AllItems)

/**
 * PROP TYPES
 */
AllItems.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.decimal,
  description: PropTypes.string
}