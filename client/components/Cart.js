import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrderThunk} from '../store/order'
import {me} from '../store'


class Cart extends Component {
    constructor(){
        super()
    }
    async componentDidMount() {
        await this.props.loadInitialData()
        await this.props.fetchOrder(this.props.user.id)

      }
    
    render(){
        const{order} = this.props;        
        const cartItems = order.lineItems
        return (
            <div>
               <h1>Your Cart</h1>
               {cartItems 
                ? cartItems.map(item => {
                    return (
                        <div key={item.id}>
                            <div>
                                {item.item.name}
                            </div>
                            <img src={item.item.imageURL} />
                            <p>item price: {item.price/100}</p>
                        </div>
                    )
                })
               : ''}
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
    loadInitialData: me
  }

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

/**
 * PROP TYPES
 */
