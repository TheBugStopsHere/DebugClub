import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrderThunk, removeFromCart, orderUpdate} from '../store/order'
import {me} from '../store'
import { addDecimal, getTotal } from '../../script/util';
import {getGuest} from '../store/guest'


class Cart extends Component {
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this)
        this.handleCheckout = this.handleCheckout.bind(this)
    }
    async componentDidMount() {
        await this.props.loadInitialData()
        await this.props.getGuest()
        await this.props.fetchOrder(this.props.user.id || this.props.guest.id)
        this.handleClick = this.handleClick.bind(this);
      }
    handleClick(lineItemId, userId) {
        this.props.removeFromCart(lineItemId, userId)
        // await this.props.fetchOrder(this.props.user.id || this.props.guest.id)
        //dispatch thunk. Send data to cart.
    }
    async handleCheckout() {
        const order = {
            total: getTotal(this.props.order.lineItems)
        }
        await this.props.orderUpdate(order, this.props.order.id, this.props.user.id)
        //dispatch thunk. Send data to cart.
        this.props.history.push('/checkout')
    }
    
    render(){
        if(!this.props.order) {
            return (
                <div>
                    <h1>Your Cart</h1>
                    <p>Your Cart Is Empty!</p>
                </div>
            )
        }
        const{order, user, guest} = this.props;        
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
                            <button type='button' id='remove' onClick={() => this.handleClick(currLineItem.id, (user.id || guest.id))}> Remove Item </button>
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
               <button type='button' id='Checkout' onClick={this.handleCheckout}> Checkout </button>
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
        user: state.user,
        guest: state.guest
    }
}

const mapDispatchToProps = {
    //Thunk to display all orders from the allOrders state
    fetchOrder: getOrderThunk,
    removeFromCart: removeFromCart,
    orderUpdate: orderUpdate,
    getGuest: getGuest,
    loadInitialData: me
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

/**
 * PROP TYPES
 */
