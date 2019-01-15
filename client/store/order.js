import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const RESET_ORDER = 'RESET_ORDER'

/**
 * INITIAL STATE
 */
//order will need to be accessed as state.order.allOrders and state.order.selectedOrder
const selectedOrder = {}

/**
 * ACTION CREATORS
 */
//this action will receive an order object. We will set the order as our selected order object
export const getOrder = order => {
  return {
    type: GET_ORDER,
    selectedOrder: order
  }
}

export const resetOrder = () => {
  return {
    type: RESET_ORDER,
    selectedOrder: {}
  }
}

/**
 * THUNK CREATORS
 */
//This thunk will fetch the order from the server and will use the getOrder action creator to add it to the selectedOrder object on state.
export const getOrderThunk = userId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/${userId}`)
    dispatch(getOrder(data))
  }
}

export const removeFromCart = (lineItemId, userId) => {
  return async dispatch => {
    await axios.delete(`/api/orders/line-items/${lineItemId}`)
    const {data} = await axios.get(`/api/orders/${userId}`)
    dispatch(getOrder(data))
  }
}

export const newOrder = (order, userId) => {
  return async dispatch => {
    await axios.post(`/api/orders/`, order)
    const {data} = await axios.get(`/api/orders/${userId}`)
    dispatch(getOrder(data))
  }
}

export const addToCart = (item, userId) => {
  return async dispatch => {
    // axios.get to order
    const prevOrder = await axios.get(`/api/orders/${userId}`)
    const prevOrderData = prevOrder.data
    // filter line-items with the same .itemId
    const [currLineItem] = prevOrderData.lineItems.filter(
      lineItem => lineItem.itemId === item.itemId
    )
    // If our filtered array isn't empty, do an axios.put
    if (currLineItem) {
      // add the new line-item quantity & change line-item
      const newQuantity = Number(currLineItem.quantity) + Number(item.quantity)
      await axios.put(`/api/orders/line-items/${currLineItem.id}`, {
        quantity: newQuantity
      })
    } else {
      // Else, do an axios.post
      await axios.post(`/api/orders/line-items/`, item)
    }
    const {data} = await axios.get(`/api/orders/${userId}`)
    dispatch(getOrder(data))
  }
}

export const orderUpdate = (order, orderId, userId) => {
  return async dispatch => {
    await axios.put(`/api/orders/${orderId}`, order)
    const {data} = await axios.get(`/api/orders/${userId}`)
    dispatch(getOrder(data))
  }
}

/**
 * REDUCER
 */
export default function(state = selectedOrder, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.selectedOrder
    case RESET_ORDER:
      return action.selectedOrder
    default:
      return state
  }
}
