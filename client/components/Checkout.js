import React, {Component} from 'react'
import {connect} from 'react-redux'
import {orderUpdate} from '../store/order'
import Payment from './Payment'
import {Elements, StripeProvider} from 'react-stripe-elements'
import OrderConfirmation from './Order-Confirmation'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      orderNum: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleShippingSubmit = this.handleShippingSubmit.bind(this)
  }
  componentDidMount() {
    let {firstName, lastName, address, email} = this.props.user
    if (this.props.user.id) {
      if (address === null) address = this.state.address
      this.setState({
        firstName,
        lastName,
        address,
        email,
        orderNum: this.props.order.id
      })
    }
  }
  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleShippingSubmit() {
    const {order, user, guest, submit} = this.props
    const passId = user.id ? user.id : guest.id
    submit({status: 'complete'}, order.id, passId)
  }

  render() {
    const {firstName, lastName, address, email} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <label>
            First Name:
            <input type="text" name="firstName" value={firstName} />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={lastName} />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={address} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={email} />
          </label>
        </form>
        <StripeProvider apiKey="pk_test_1nc2USEcAeJ5cuoTGVU9wDw1">
          <Elements>
            <div>
              {this.props.order ? (
                <div>
                  <img
                    src="/img/credit-cards-accepted.jpg"
                    id="creditCards"
                    height={50}
                  />
                  <Payment
                    total={this.props.order.total}
                    name={this.props.user.firstName}
                    lName={this.props.user.lastName}
                    id={this.props.order.id}
                    handleShippingSubmit={this.handleShippingSubmit}
                  />
                </div>
              ) : (
                <OrderConfirmation
                  name={this.props.user.firstName}
                  orderNum={this.state.orderNum}
                  id="confirmation"
                  className="modal fade"
                  role="dialog"
                />
              )}
            </div>
          </Elements>
        </StripeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    order: state.order,
    user: state.user,
    guest: state.guest
  }
}

const mapDispatchToProps = {
  //Thunk to display all orders from the allOrders state
  submit: orderUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
