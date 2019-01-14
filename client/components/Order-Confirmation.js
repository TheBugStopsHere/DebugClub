import React, {Component} from 'react'

class OrderConfirmation extends Component {
  constructor() {
    super()
    this.randomNum = this.randomNum.bind(this)
  }

  randomNum() {
    return Math.round(Math.random() * 1000000)
  }

  componentWillUnmount() {
    //reset order on store
  }

  render() {
    return this.props.name ? (
      <div id="confirmation" className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
            <h1>Order Confirmation</h1>
          </div>
          <div className="modal-body">
            <h2>Thank you, {this.props.name}! Your order is on its way!</h2>
            <h2>
              Order #{this.randomNum()}-{this.props.orderNum}
            </h2>
          </div>
        </div>
      </div>
    ) : (
      <div />
    )
  }
}

export default OrderConfirmation
