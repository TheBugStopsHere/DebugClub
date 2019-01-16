import React from 'react'
import axios from 'axios'
import {CardElement, injectStripe} from 'react-stripe-elements'

class Payment extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit() {
    let {token} = await this.props.stripe.createToken({
      name: `${this.props.name}${this.props.lName}`
    })
    const stripePostBody = {
      amount: this.props.total,
      currency: 'usd',
      description: `Charge for Tester`,
      source: token.id
    }

    let response = await axios.post('/charge', stripePostBody)
    if (response.data.status === 'succeeded') {
      this.props.handleShippingSubmit()
    }
  }

  render() {
    return (
      <div className="payment">
        <CardElement />
        <button
          id="submit"
          className="paySubmit btn btn-info btn-md"
          data-toggle="modal"
          data-target="#confirmation"
          type="submit"
          onClick={this.handleSubmit}
        >
          Submit Payment
        </button>
      </div>
    )
  }
}

export default injectStripe(Payment)
