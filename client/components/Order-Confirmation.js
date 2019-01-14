import React, {Component} from 'react'

class OrderConfirmation extends Component {
  constructor() {
    super()
    this.randomNum = this.randomNum.bind(this)
  }

  randomNum() {
    return Math.round(Math.random() * 1000000)
  }

  render() {
    return this.props.name ? (
      <div id="orderConfirmation">
        <h1>Order Confirmation</h1>
        <h2>Thank you, {this.props.name}! Your order is on its way!</h2>
        <h2>
          Order #{this.randomNum()}-{this.props.id}
        </h2>
      </div>
    ) : (
      <div id="orderConfirmation">
        <h1>Order Confirmation</h1>
        <h2>Your order is on its way!</h2>
        <h2>
          Order #{this.randomNum()}-{this.props.id}
        </h2>
      </div>
    )
  }
}

export default OrderConfirmation
