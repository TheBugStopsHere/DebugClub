import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrderThunk, removeFromCart, orderUpdate, getOrderUser, getOrderGuest} from '../store/order'
import {me} from '../store'
import {addDecimal, getTotal} from '../../script/util'
import {getGuest} from '../store/guest'

class Cart extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  async componentDidMount() {
    await this.props.loadInitialData()
    await this.props.getGuest()
    if(this.props.user && this.props.user.id) {
      console.log('there is a user!')
      await this.props.getOrderUser()
    } 
    else {
      console.log('there is ONLY A GUEST')
      await this.props.getOrderGuest()
    }
  }
  handleClick(lineItemId) {
    let type
    if (this.props.user && this.props.user.id) {
      type = 'user'
    } else {
      type = 'guest'
    }
    this.props.removeFromCart(lineItemId, type)
    // await this.props.fetchOrder(this.props.user.id || this.props.guest.id)
    //dispatch thunk. Send data to cart.
  }
  async handleCheckout() {
    let type
    if (this.props.user && this.props.user.id) {
      type = 'user'
    } else {
      type = 'guest'
    }
    const order = {
      total: getTotal(this.props.order.lineItems)
    }
    await this.props.orderUpdate(order, this.props.order.id, type)
    //dispatch thunk. Send data to cart.
    this.props.history.push('/checkout')
  }

  render() {
    if (!this.props.order) {
      return (
        <div className="cart">
          <h1>Your Cart</h1>
          <p>Your Cart Is Empty!</p>
        </div>
      )
    }
    const {order, user, guest} = this.props
    const lineItems = order.lineItems //items in the cart
    return (
      <div className="cart">
        <h1>Your Cart</h1>
        {lineItems ? (
          lineItems.map(currLineItem => {
            return (
              <div className="cartItemDetail" key={currLineItem.id}>
                <div>{currLineItem.item.name}</div>
                <img className="cartItemPic" src={currLineItem.item.imageURL} />
                <p>Current Quantity: {currLineItem.quantity}</p>
                <p>Price: ${currLineItem.price / 100}</p>
                <button
                  className="cartRemoveItem btn btn-info btn-md"
                  type="button"
                  onClick={() =>
                    this.handleClick(currLineItem.id)
                  }
                >
                  {' '}
                  Remove Item{' '}
                </button>
              </div>
            )
          })
        ) : (
          <p>Your cart has no items in it.</p>
        )}
        {lineItems ? (
          <div id="cartTotal">
            <h3 id="cartTotalLabel">Order Total</h3>
            <h3 id="cartTotalDecimal">${addDecimal(getTotal(lineItems))}</h3>
          </div>
        ) : (
          ''
        )}
        <button
          type="button"
          id="Checkout"
          className="btn btn-info btn-md"
          onClick={this.handleCheckout}
        >
          {' '}
          Checkout{' '}
        </button>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    order: state.order,
    user: state.user,
    guest: state.guest
  }
}

const mapDispatchToProps = {
  //Thunk to display all orders from the allOrders state
  fetchOrder: getOrderThunk,
  removeFromCart: removeFromCart,
  orderUpdate: orderUpdate,
  getOrderGuest: getOrderGuest,
  getOrderUser: getOrderUser,
  getGuest: getGuest,
  loadInitialData: me
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

/**
 * PROP TYPES
 */
