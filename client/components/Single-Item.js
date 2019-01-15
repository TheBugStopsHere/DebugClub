import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemThunk} from '../store/item'
import {addToCart, getOrderThunk, newOrder} from '../store/order'
import {me} from '../store'
import {addDecimal, stockToArr} from '../../script/util'

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
    await this.props.fetchOrder(this.props.user.id)
    await this.props.fetchItem(this.props.match.params.itemId)
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
    const userId = this.props.user.id
    console.log(
      'Is there an order? If so this.props.order is: ',
      this.props.order
    )
    if (!this.props.order) {
      //if there's no order, create one.
      const order = {
        status: 'in-progress',
        userId
      }
      await this.props.newOrder(order, userId)
    }
    //price, quantity, orderId, itemId
    let item = {
      price: this.props.item.price,
      quantity: this.state.quantity,
      orderId: this.props.order.id, //MUST BE CHANGED TO VARIABLE IN FUTURE!
      itemId: this.props.item.id
    }
    console.log('item', item)
    this.props.addToCart(item, userId) //MUST BE CHANGED TO VARIABLE IN FUTURE!!
    //dispatch thunk. Send data to cart.
  }

  render() {
    const {item} = this.props
    return (
      <div>
        <div>
          <h1>{item.name}</h1>
          {item.price ? <h1>${addDecimal(item.price)}</h1> : null}

          <img src={item.imageURL} height={400} width={400} />
          {item.inStock < 10 && item.inStock > 0 ? (
            <div id="buyNowWarning">
              <h4>There are only {item.inStock} left in stock!</h4>
            </div>
          ) : null}

          <h4>Type: {item.category}</h4>
          <p>{item.description}</p>
        </div>

        {item.inStock > 0 ? (
          <div id="inStock">
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
        ) : (
          <div id="outOfStock">
            <h4>This is is current out of stock</h4>
          </div>
        )}

        <button type="button" id="addToCart" onClick={this.handleClick}>
          {' '}
          Add To Cart{' '}
        </button>
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
    user: state.user
  }
}

const mapDispatchToProps = {
  //Thunk to display an item from the selectedItem state. Takes an itemId as input to invoke the function.
  fetchItem: getItemThunk,
  addToCart: addToCart,
  newOrder: newOrder,
  fetchOrder: getOrderThunk,
  loadInitialData: me
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)

/**
 * PROP TYPES
 */
