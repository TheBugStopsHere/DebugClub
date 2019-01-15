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
      await this.props.getOrderUser()
    } 
    else {
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
        <div>
          <h1>Your Cart</h1>
          {lineItems ? (
            lineItems.map(currLineItem => {
              return (
                <div className="cartItemContainer" key={currLineItem.id}>
                  <img
                    className="cartItemPic"
                    src={currLineItem.item.imageURL}
                  />
                  <div className="cartItemDetails">
                    <div className="cartItemTitleBtn">
                      <span className="cartItemTitle">
                        {currLineItem.item.name}
                      </span>
                      <button
                        className="cartRemoveItem btn btn-info btn-md"
                        type="button"
                        onClick={() =>
                          this.handleClick(currLineItem.id, user.id || guest.id)
                        }
                      >
                        <span className="removeCartItemX">&times;</span>
                      </button>
                    </div>
                    <div className="cartItemQtyPrice">
                      <span>Quantity:</span>
                      <span className="cartQtyPrice">
                        {' '}
                        {currLineItem.quantity}
                      </span>
                    </div>
                    <div className="cartItemQtyPrice">
                      <span>Price:</span>
                      <span className="cartQtyPrice">
                        ${currLineItem.price / 100}
                      </span>
                    </div>
                    <div className="cartItemQtyPrice">
                      <span>Subtotal:</span>
                      <span className="cartQtyPrice">
                        ${currLineItem.price / 100 * currLineItem.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p>Your cart has no items in it.</p>
          )}
          {lineItems ? (
            <div id="cartTotal">
              <h3 id="cartTotalDecimal">
                {' '}
                Total ${addDecimal(getTotal(lineItems))}
              </h3>
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
          ) : (
            ''
          )}
        </div>
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
