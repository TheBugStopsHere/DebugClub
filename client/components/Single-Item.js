import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemThunk} from '../store/item'
import {addToCart, getOrderThunk, newOrder, getOrderGuest, getOrderUser} from '../store/order'
import {me} from '../store'
import {addDecimal, stockToArr} from '../../script/util'
import {getGuest} from '../store/guest'

class SingleItem extends Component {
  constructor() {
    super()
    //default state is one
    this.state = {
      quantity: 1
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    await this.props.loadInitialData()
    await this.props.getGuest()
    await this.props.fetchItem(this.props.match.params.itemId)
    if(this.props.user && this.props.user.id) {
      await this.props.getOrderUser()
    }
    else {
      await this.props.getOrderGuest()
    }
  }

  handleChange(event) {
    //this captures the option being selected, but not submitted
    const quantity = Number(event.target.value)
    this.setState({
      quantity
    })
  }

  async handleClick() {
    //Before adding to cart, check first if there is an order.
    let type
    if (this.props.user && this.props.user.id) {
      type = 'user'
    } else {
      type = 'guest'
    }
    if (!this.props.order || !this.props.order.id) {
      const order = {
        status: 'in-progress',
        guestSessionId: this.props.guest.id
      }
      if (this.props.user) {
        order.userId = this.props.user.id
      }
      await this.props.newOrder(order, type)
    }
    //price, quantity, orderId, itemId
    let item = {
      price: this.props.item.price,
      quantity: this.state.quantity,
      orderId: this.props.order.id, //MUST BE CHANGED TO VARIABLE IN FUTURE!
      itemId: this.props.item.id
    }
    this.props.addToCart(item, type) //MUST BE CHANGED TO VARIABLE IN FUTURE!!
    //dispatch thunk. Send data to cart.
  }

  render() {
    const {item} = this.props
    return (
      <div className="thumnail">
        <img
          className="singleItemPic"
          src={item.imageURL}
          height={400}
          width={400}
        />
        <div className="caption">
          {item.inStock > 0 ? (
            <div id="inStock">
              <button
                type="button"
                id="addToCart"
                className="btn btn-info btn-lg"
                onClick={this.handleClick}
              >
                {' '}
                Add To Cart{' '}
              </button>
              <div className="qty">
                <label name="purchaseQuanity">Quantity</label>
                <select onChange={this.handleChange} name="purchaseQuanity">
                  {stockToArr(item.inStock).map(function(num) {
                    return (
                      <option key={num} value={num}>
                        {' '}
                        {num}{' '}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          ) : (
            <div id="outOfStock">
              <h4>Out of stock</h4>
              <button
                disabled
                type="button"
                id="addToCart"
                className="btn btn-info btn-md"
                onClick={this.handleClick}
              >
                {' '}
                Add To Cart{' '}
              </button>
            </div>
          )}
          <div>
            <h1 className="singleItemName">{item.name}</h1>
            {item.price ? <h1>${addDecimal(item.price)}</h1> : null}

            {item.inStock < 10 && item.inStock > 0 ? (
              <div id="buyNowWarning">
                <h4>There are only {item.inStock} left in stock!</h4>
              </div>
            ) : null}

            <h4>Type: {item.category}</h4>
            <p>{item.description}</p>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state, ownProps) => {
  return {
    item: state.item,
    order: state.order,
    guest: state.guest,
    user: state.user
  }
}

const mapDispatchToProps = {
  //Thunk to display an item from the selectedItem state. Takes an itemId as input to invoke the function.
  fetchItem: getItemThunk,
  addToCart: addToCart,
  getGuest: getGuest,
  newOrder: newOrder,
  getOrderGuest: getOrderGuest,
  getOrderUser: getOrderUser,
  fetchOrder: getOrderThunk,
  loadInitialData: me
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)

/**
 * PROP TYPES
 */
