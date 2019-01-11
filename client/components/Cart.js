import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrderThunk, removeFromCart} from '../store/order'
import {me} from '../store'
import { addDecimal, getTotal } from '../../script/util';


class Cart extends Component {
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this)
    }
    async componentDidMount() {
        await this.props.loadInitialData()
        await this.props.fetchOrder(this.props.user.id)
        this.handleClick = this.handleClick.bind(this);
      }
    async handleClick(lineItemId, userId) {
        await this.props.removeFromCart(lineItemId, userId)
        //dispatch thunk. Send data to cart.
    }
    
    render(){
        const{order, user} = this.props;        
        const lineItems = order.lineItems //items in the cart
        return (
            <div>
               <h1>Your Cart</h1>
               {lineItems 
                ? 
                lineItems.map(currLineItem => {
                    return (
                        <div key={currLineItem.id}>
                            <div>
                                {currLineItem.item.name} 
                            </div>
                            <img src={currLineItem.item.imageURL} />
                            <p>Current Quantity: {currLineItem.quantity}</p>
                            <p>item price: {currLineItem.price/100}</p>
                            <button type='button' id='remove' onClick={() => this.handleClick(currLineItem.id, user.id)}> Remove Item </button>
                        </div>
                    )
                })
                
               : <p>Your cart has no items in it.</p>}
               {lineItems 
                ? 
                (
                    <div>
                        <h1>
                            Order Total
                        </h1>
                        <h4>
                            {addDecimal(getTotal(lineItems))}
                        </h4>
                    </div>
                )
                : ''
                }
               <button type='button' id='Checkout'> Checkout </button>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
    return {
        order: state.order,
        user: state.user
    }
}

const mapDispatchToProps = {
    //Thunk to display all orders from the allOrders state
    fetchOrder: getOrderThunk,
    removeFromCart: removeFromCart,
    loadInitialData: me
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

/**
 * PROP TYPES
 */
