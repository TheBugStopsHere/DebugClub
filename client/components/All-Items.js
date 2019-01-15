import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/items'
import {addToCart, getOrderThunk, newOrder} from '../store/order'
import {me} from '../store'
import {addDecimal, stockToArr} from '../../script/util' //utility functions

class AllItems extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.createGrid = this.createGrid.bind(this) //for styling
    this.handleChange = this.handleChange.bind(this) //for the quantity of items
    this.handleClick = this.handleClick.bind(this) //for adding to cart
  }

  async componentDidMount() {
    this.props.fetchItems()
    await this.props.loadInitialData()
    await this.props.fetchOrder(this.props.user.id)
  }

  handleChange(event) {
    //sets the quantity selected on state before add to cart selected. The default is otherwise one
    //this captures the option being selected, but not submitted
    const quantity = Number(event.target.value)
    this.setState({
      quantity
    })
  }

  async handleClick(singleItem) {
    //Before adding to cart, check first if there is an order.
    const userId = this.props.user.id

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
      price: singleItem.price,
      quantity: this.state.quantity,
      orderId: this.props.order.id, //MUST BE CHANGED TO VARIABLE IN FUTURE!
      itemId: singleItem.id
    }
    console.log('item', item)
    this.props.addToCart(item, userId) //MUST BE CHANGED TO VARIABLE IN FUTURE!!
    //dispatch thunk. Send data to cart.
  }

  createGrid() {
    const {items} = this.props
    const numRows = Math.ceil(items.length / 3)
    let grid = []
    for (let i = 0; i < numRows; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        let item = items[j + 3 * i]
        row.push(
          <div key={'td_' + i + '_' + j} className="col-sm-6 col-md-4">
            {/* Name and image link to a component rendering the individual item */}
            <div id="linkToSingle">
              <Link to={`item/${item.id}`}>
                <h4>{item.name} </h4>
                <img
                  src={item.imageURL}
                  className="center-block img-rounded"
                  alt="Responsive image"
                  height={300}
                  width={300}
                />
              </Link>
            </div>

            <h4> ${addDecimal(item.price)} </h4>

            {/* If the item is in stock, renders a drop down starting at 1 to allow the user to choose the quantity of the items they want to add to their cart. This puts the quantity on local state of this component using handleChange. If the item is not in stock, renders a string indicating such. */}
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
                <h4>This item is current out of stock</h4>
              </div>
            )}

            {/* disables the 'Add To Cart' button if the item is no longer in stock */}
            {item.inStock > 0 ? (
              <button
                type="button"
                id="addToCart"
                onClick={() => this.handleClick(item)}
              >
                Add To Cart
              </button>
            ) : (
              <button type="button" id="disabled" disabled>
                Add To Cart
              </button>
            )}
          </div>
        )
      }
      grid.push(
        <div key={'tr_' + i} className="row">
          {row}
        </div>
      )
    }
    return grid
  }

  render() {
    return <div className="container-fluid allItems">{this.createGrid()}</div>
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    items: state.items,
    order: state.order,
    user: state.user
  }
}

const mapDispatchToProps = {
  //Thunk to display all items from the allItems state
  fetchItems: getItemsThunk,
  addToCart: addToCart,
  newOrder: newOrder,
  fetchOrder: getOrderThunk,
  loadInitialData: me
}

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)

/**
 * PROP TYPES
 */
