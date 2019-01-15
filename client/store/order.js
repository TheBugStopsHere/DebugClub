import axios from 'axios'
import items from './items'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const GET_ORDER_ITEMS = 'GET_ORDER_ITEMS'

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
export const getOrderItems = order => {
  return {
    type: GET_ORDER_ITEMS,
    numItems: order.lineItems.length
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
    await axios.post(`/api/orders/line-items/`, item)
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
    case GET_ORDER_ITEMS:
      return numItems
    default:
      return state
  }
}
