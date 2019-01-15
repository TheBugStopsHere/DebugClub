import React, {Component} from 'react'
import {Link} from 'react-router-dom'

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
    return (
      <div id="confirmation" className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <Link to="/">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </Link>
            <h1>Order Confirmation</h1>
          </div>
          <div className="modal-body">
            <h2>
              Thank you, {this.props.name || 'fellow bug lover'}! Your order is
              on its way!
            </h2>
            <h2>
              Order #{this.randomNum()}-{this.props.orderNum}
            </h2>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderConfirmation
