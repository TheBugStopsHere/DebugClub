import React from 'react'
import axios from 'axios'
import { CardElement, injectStripe } from 'react-stripe-elements'

class Payment extends React.Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit () {
    console.log('submitted');
    let {token} = await this.props.stripe.createToken({name: "Name"}); //ADD USER INFO HERE
    console.log('token returned', token);
    const stripePostBody = { //ADD TOTAL AMOUNT AND USER INFO IN DESC HERE FROM PROPS OR STATE
      amount: this.props.total,
      currency: 'usd',
      description: `Charge for Tester`,
      source: token.id
    }
    
    let response = await axios.post('/charge', stripePostBody)
    console.log(response)
      
    if (response.data.status === 'succeeded') console.log("Purchase Complete!") //ADD FUNCTIONALITY HERE
  }

  render() {
    return (
      <div className='payment'>
        <CardElement />
        <button type='submit' onClick={this.handleSubmit}>Submit Payment</button>
      </div>
    )
  }
}

export default injectStripe(Payment);