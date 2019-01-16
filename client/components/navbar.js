import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

class Navbar extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <nav
        className="navbar navbar-inverse navbar-default navbar-fixed-top"
        id="navItems"
      >
        <Link to="/" id="linkHome">
          <img id="logo" src="/darkRedBug.png" />
          <h1 id="title">The Bug Stops Here</h1>
        </Link>
        {this.props.isLoggedIn ? (
          <div id="navLinks">
            {/* The navbar will show these links after you log in */}
            <Link to="/home" className="navItem">
              <span className="glyphicon glyphicon-user" aria-hidden="true" />
              <span>Profile</span>
            </Link>
            <a href="#" onClick={this.props.handleClick} className="navItem">
              <span
                className="glyphicon glyphicon-log-out"
                aria-hidden="true"
              />
              <span>Logout</span>
            </a>
            <Link to="/cart" className="navItem">
              <span
                className="glyphicon glyphicon-shopping-cart"
                aria-hidden="true"
              />
              <span>Cart</span>
              {this.props.order ? (
                <span className="badge">{this.props.order && this.props.order.lineItems ? this.props.order.lineItems.length : null}</span>
              ) : (
                <span className="badge">0</span>
              )}
            </Link>
          </div>
        ) : (
          <div id="navLinks">
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className="navItem">
              <span className="glyphicon glyphicon-log-in" aria-hidden="true" />
              <span>Login</span>
            </Link>
            <Link to="/cart" className="navItem">
              <span
                className="glyphicon glyphicon-shopping-cart"
                aria-hidden="true"
              />
              <div>Cart</div>
            </Link>
          </div>
        )}
      </nav>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    order: state.order,
    isLoggedIn: !!state.user.id
    // orderItems: state.order.lineItems.length
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
