import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrderThunk} from '../store/order'
import Payment from './Payment'
import {Elements, StripeProvider} from 'react-stripe-elements'


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
  componentDidMount() {
    let {firstName, lastName, address, email} = this.props.user
    if(this.props.user.id){
      if (address === null) address = this.state.address
      this.setState({
      firstName,
      lastName,
      address,
      email
    })
    }
    
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
            <input type='text' name='address' 
              value={address} />
          </label>
          <label>
            Email:
            <input type='email' name='email' 
              value={email} />
          </label>
        </form>
        <StripeProvider apiKey='pk_test_1nc2USEcAeJ5cuoTGVU9wDw1'>
          <Elements>
            <Payment total={this.props.order.total}/>
          </Elements>
        </StripeProvider>
      </div> 
    ) // IF WANTED, pass down handleShippingSubmit to Payment to be invoked when payment submitted
  }
}

const mapStateToProps = (state) => {
  return {
      order: state.order,
      user: state.user
  }
}

const mapDispatchToProps = {
  //Thunk to display all orders from the allOrders state
  fetchOrder: getOrderThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
