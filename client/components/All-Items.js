import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/items'
import {addToCart, getOrderThunk, newOrder} from '../store/order'
import {me} from '../store'
import {addDecimal, stockToArr} from '../../script/util'
import {getGuest} from '../store/guest'

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
    await this.props.loadInitialData()
    await this.props.getGuest()
    await this.props.fetchOrder(this.props.user.id || this.props.guest.id)
    await this.props.fetchItems()
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
    let idToPass
    if (this.props.user.id) {
      idToPass = this.props.user.id
    } else {
      idToPass = this.props.guest.id
    }
    if (!this.props.order) {
      const order = {
        status: 'in-progress',
        guestSessionId: this.props.guest.id
      }
      if (this.props.user) {
        order.userId = this.props.user.id
      }
      await this.props.newOrder(order, idToPass)
    }
    //price, quantity, orderId, itemId
    let item = {
      price: singleItem.price,
      quantity: this.state.quantity,
      orderId: this.props.order.id, //MUST BE CHANGED TO VARIABLE IN FUTURE!
      itemId: singleItem.id
    }
    console.log('item', item)
    this.props.addToCart(item, idToPass) //MUST BE CHANGED TO VARIABLE IN FUTURE!!
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
          <div
            key={'td_' + i + '_' + j}
            className="allItemsItems col-sm-6 col-md-4 align-self-center"
          >
            {/* Name and image link to a component rendering the individual item */}
            <div className="linkToSingle">
              <Link to={`item/${item.id}`}>
                <img
                  src={item.imageURL}
                  className="allItemsPics center-block img-rounded"
                  alt="Responsive image"
                />
                <div className="allItemsInfo">
                  <h4 className="allItemsName">{item.name} </h4>
                  {item.inStock > 0 ? (
                    <div className="allItemsPriceInfo">
                      <h3 className="allItemsPrice">
                        {' '}
                        ${addDecimal(item.price)}
                      </h3>
                    </div>
                  ) : (
                    <div className="allItemsPriceInfo">
                      <h3 className="allItemsOutOfStock">Out of stock</h3>
                      <h3 className="allItemsPrice">
                        ${addDecimal(item.price)}
                      </h3>
                    </div>
                  )}
                </div>
              </Link>
            </div>

            {/* disables the 'Add To Cart' button if the item is no longer in stock
            {item.inStock > 0 ? (
              <button
                type="button"
                id="addToCart"
                className="btn btn-info btn-md"
                onClick={() => this.handleClick(item)}
              >
                Add To Cart
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-info btn-md"
                id="disabled"
                disabled
              >
                Add To Cart
              </button>
            )} */}
          </div>
        )
      }
      grid.push(<div key={'tr_' + i}>{row}</div>)
    }
    return <div id="addItemsGrid">{grid}</div>
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
    guest: state.guest,
    user: state.user
  }
}

const mapDispatchToProps = {
  //Thunk to display all items from the allItems state
  fetchItems: getItemsThunk,
  addToCart: addToCart,
  newOrder: newOrder,
  getGuest: getGuest,
  fetchOrder: getOrderThunk,
  loadInitialData: me
}

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)

/**
 * PROP TYPES
 */
