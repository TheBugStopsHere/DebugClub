import React from 'react'
import {Link} from 'react-router-dom'

export const Footer = () => {
  return (
    <div>
      <footer id="footer">
        <Link to="/about-the-developers" id="aboutUs">
          <h4 id="aboutUs">About The Developers</h4>
        </Link>
      </footer>
    </div>
  )
}
