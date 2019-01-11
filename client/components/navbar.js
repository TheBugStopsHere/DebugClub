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
      <img id="logo" src="/darkRedLogo.png" />
      <h1 id="title">The Bug Stops Here</h1>
    </Link>
    {isLoggedIn ? (
      <div id="navLinks">
        {/* The navbar will show these links after you log in */}
        <div className="navItem">
          <span class="glyphicon glyphicon-user" aria-hidden="true" />
          <Link to="/home">Profile</Link>
        </div>
        <div className="navItem">
          <span class="glyphicon glyphicon-log-out" aria-hidden="true" />
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
        <div className="navItem">
          <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true" />
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    ) : (
      <div id="navLinks">
        {/* The navbar will show these links before you log in */}
        <div className="navItem">
          <span class="glyphicon glyphicon-log-in" aria-hidden="true" />
          <Link to="/login">Login</Link>
        </div>
        <div className="navItem">
          <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true" />
          <Link to="/cart">Cart</Link>
        </div>
      </div>
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
