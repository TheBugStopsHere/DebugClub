import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav
    className="navbar navbar-inverse navbar-default navbar-fixed-top"
    id="navItems"
  >
    <Link to="/" id="linkHome">
      <img id="logo" src="/bugRed.png" />
      <h1 id="title">The Bug Stops Here</h1>
    </Link>
    {isLoggedIn ? (
      <Fragment>
        {/* The navbar will show these links after you log in */}
        <Link to="/home" className="navItem">
          My Profile
        </Link>
        <a href="#" onClick={handleClick}>
          Logout
        </a>
        <Link to="/cart" className="navItem">
          My Cart
        </Link>
      </Fragment>
    ) : (
      <Fragment>
        {/* The navbar will show these links before you log in */}
        <Link to="/login" className="navItem">
          Login
        </Link>
        <Link to="/cart" className="navItem">
          My Cart
        </Link>
      </Fragment>
    )}
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
