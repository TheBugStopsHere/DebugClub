import React from 'react'
import axios from 'axios'
import {CardElement, injectStripe} from 'react-stripe-elements'
import OrderConfirmation from './Order-Confirmation'

class Payment extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      complete: false
    }
  }

  async handleSubmit() {
    console.log('submitted')
    let {token} = await this.props.stripe.createToken({name: 'Name'}) //ADD USER INFO HERE
    console.log('token returned', token)
    const stripePostBody = {
      //ADD TOTAL AMOUNT AND USER INFO IN DESC HERE FROM PROPS OR STATE
      amount: this.props.total,
      currency: 'usd',
      description: `Charge for Tester`,
      source: token.id
    }

    let response = await axios.post('/charge', stripePostBody)
    console.log(response)

    if (response.data.status === 'succeeded') {
      console.log('Purchase Complete!')
      this.props.handleShippingSubmit()
      this.setState({complete: true})
    }
  }

  render() {
    return this.state.complete ? (
      <div>
        <OrderConfirmation name={this.props.name} id={this.props.id} />
      </div>
    ) : (
      <div className="payment">
        <CardElement />
        <button type="submit" onClick={this.handleSubmit}>
          Submit Payment
        </button>
      </div>
    )
  }
}

export default injectStripe(Payment)
