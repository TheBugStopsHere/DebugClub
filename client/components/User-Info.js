import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class UserInfo extends React.Component {
  

  render(){
    const {firstName, imageURL, email, admin} = this.props
      return (
        <div>
        <div className='flex'>
          <img src={imageURL} width="200" />
          <h1>{(firstName)}, how would you like to update your information?</h1>
    
          <form>
                <div>
                  <label htmlFor="firstName">
                    First Name
                  </label>
                  <input name="firstName" type="text" />
                </div>
    
                <div>
                  <label htmlFor="lastName">
                    Last Name
                  </label>
                  <input name="lastName" type="text" />
                </div>
    
                <div>
                  <label htmlFor="imageURL">
                    Image URL
                  </label>
                  <input name="imageURL" type="text" />
                </div>
    
                <div>
                  <label htmlFor="address">
                    Address
                  </label>
                  <input name="address" type="text" />
                </div>
    
                <div>
                  <label htmlFor="email">
                    Email
                  </label>
                  <input name="email" type="text" />
                </div>
    
                <div>
                  <label htmlFor="password">
                    Password
                  </label>
                  <input name="password" type="text" />
                </div>
    
          </form>
          
    
    
    
    
          {/* This is the admin section */}
          {admin 
          ? (
            <div>
              {/* nothing needed in this section. Kept for future possibilities. */}
            </div>
          ) 
          : ''}
          
        </div>
      </div>
      )
    }
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
