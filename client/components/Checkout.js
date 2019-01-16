import React, {Component} from 'react'
import {connect} from 'react-redux'
import {orderUpdate, orderUpdateConfirmation} from '../store/order'
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
    const {order} = this.props
    let updatedOrderInfo = {}
    if (this.props.user && this.props.user.id) {
      updatedOrderInfo.userId = this.props.user.id
    } else {
      updatedOrderInfo.guestSessionId = this.props.order.guestSessionId
    }
    updatedOrderInfo.status = 'complete'
    this.props.orderUpdateConfirmation(updatedOrderInfo, order.id)
  }

  render() {
    const {firstName, lastName, address, email} = this.state
    return (
      <div className="checkout">
        <h3 id="paymentTitle">Payment</h3>
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
              {this.props.order.status === 'complete' ? (
                <OrderConfirmation
                  name={this.props.user.firstName}
                  orderNum={this.state.orderNum}
                  id="confirmation"
                  className="modal fade"
                  role="dialog"
                />
              ) : (
                <div>
                  <Payment
                    total={this.props.order.total}
                    name={this.props.user.firstName}
                    lName={this.props.user.lastName}
                    id={this.props.order.id}
                    handleShippingSubmit={this.handleShippingSubmit}
                  />
                </div>
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
  submit: orderUpdate,
  orderUpdateConfirmation: orderUpdateConfirmation
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
