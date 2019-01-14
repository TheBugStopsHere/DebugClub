import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { updateUserThunk } from '../store/guest';
import { getUserThunk } from '../store/update';

/**
 * COMPONENT
 */
class UserInfo extends React.Component {
  constructor(){
      super()
        this.state = {
            firstName: '',
            lastName: '',
            imageURL: '',
            address: '',
            email: '',
            password: ''
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getUser()
    this.setState({
        firstName: this.props.firstName || '',
        lastName: this.props.lastName || '',
        imageURL: this.props.imageURL || '',
        address: this.props.address || '',
        email: this.props.email,
        password: ''
    })
  }

  handleChange(event){
      this.setState({
          [event.target.name]: event.target.value
      })
  }

  handleSubmit(event){
      //the page will not refresh but the user's updated information will post to the database, their updates will still be visable with the exception of the updated password.
      event.preventDefault();
      let infoToUpdate
      if(this.state.password === ''){
        infoToUpdate = {
          ...this.state
        }
        infoToUpdate.password = this.props.password
      } else {
        infoToUpdate = this.state
      }
      this.props.updateUser(infoToUpdate)
      this.setState({
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        imageURL: this.props.imageURL,
        address: this.props.address,
        email: this.props.email,
        password: ''
    })
  }

  render(){
    const {firstName, imageURL, admin} = this.props
      return (
        <div>
        <div className='flex'>
          <img src={imageURL} width="200" />
          <h1>{(firstName)}, how would you like to update your information?</h1>
    
          <form onSubmit={this.handleSubmit}>
                <div>
                  <label htmlFor="firstName">
                    First Name
                  </label>
                  <input name="firstName" type="text" onChange={this.handleChange} value={this.state.firstName} />
                </div>
    
                <div>
                  <label htmlFor="lastName">
                    Last Name
                  </label>
                  <input name="lastName" type="text" onChange={this.handleChange} value={this.state.lastName} />
                </div>
    
                <div>
                  <label htmlFor="imageURL">
                    Image URL
                  </label>
                  <input name="imageURL" type="text" onChange={this.handleChange} value={this.state.imageURL} />
                </div>
    
                <div>
                  <label htmlFor="address">
                    Address
                  </label>
                  <input name="address" type="text" onChange={this.handleChange} value={this.state.address} />
                </div>
    
                <div>
                  <label htmlFor="email">
                    Email
                  </label>
                  <input name="email" type="text" onChange={this.handleChange} value={this.state.email} />
                </div>
    
                <div>
                  <label htmlFor="password">
                    Password
                  </label>
                  <input name="password" type="text" onChange={this.handleChange} value={this.state.password} />
                </div>

                <button type="submit"> Update My Information </button>
    
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
    firstName: state.update.firstName,
    lastName: state.update.lastName,
    imageURL: state.update.imageURL,
    address: state.update.address,
    email: state.update.email,
    admin: state.update.admin,
    password: state.update.password
  }
}

const mapDispatch = {
    getUser: getUserThunk,
    updateUser: updateUserThunk,
  }

export default connect(mapState, mapDispatch)(UserInfo)

/**
 * PROP TYPES
 */
UserInfo.propTypes = {
  firstName: PropTypes.string,
  imageURL: PropTypes.string,
  email: PropTypes.string
}
