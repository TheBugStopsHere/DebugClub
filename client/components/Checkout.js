import React, {Component} from 'react'
import Payment from './Payment'

class Checkout extends Component {
  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleShippingSubmit = this.handleShippingSubmit.bind(this);
  }
  handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleShippingSubmit (evt) {
    evt.preventDefault();
    //IF WE WANT TO SAVE SHIPPING DATA
  }

  render() {
    const {firstName, lastName, address, email} = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
          <label>
            First Name:
            <input type='text' name='firstName' 
              value={firstName} />
          </label>
          <label>
            Last Name:
            <input type='text' name='lastName' 
              value={lastName} />
          </label>
          <label>
            Address:
            <input type='text' name='lastName' 
              value={address} />
          </label>
          <label>
            Email:
            <input type='email' name='email' 
              value={email} />
          </label>
        </form>
        <Payment /> 
      </div>  
    ) // IF WANTED, pass down handleShippingSubmit to be invoked when payment submitted
  }
}

export default Checkout