import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'


/**
 * INITIAL STATE
 */
const allOrders = []


/**
 * ACTION CREATORS
 */

const getOrders = orders => {
    return (
        {
            type: GET_ORDERS,
            allOrders: orders
        }
    )
}


/**
 * THUNK CREATORS
 */

export const getOrdersThunk = () => {
    return async (dispatch) => {
        const {data} = await axios.get('/api/orders');
        dispatch(getOrders(data));
    }
}

/**
 * REDUCER
 */
export default function(state = allOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
        return action.allOrders;
    default:
      return state
  }
}
