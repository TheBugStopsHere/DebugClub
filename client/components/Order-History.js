import React, {Component} from 'react'
import {connect} from 'react-redux'


class OrderHistory extends Component {

    async componentDidMount() {
        // await this.props.loadInitialData()
        // await this.props.getGuest()
        // await this.props.fetchOrder(this.props.user.id || this.props.guest.id)
        // await this.props.fetchItem(this.props.match.params.itemId)
    }
    
    render(){
        return (
            <div>
                <h1>
                    ORDER HISTORY
                </h1>
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
    // fetchItem: getItemThunk,
    // addToCart: addToCart,
    // getGuest: getGuest,
    // newOrder: newOrder,
    // fetchOrder: getOrderThunk,
    // loadInitialData: me
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)

/**
 * PROP TYPES
 */