import axios from 'axios'
import items from './items'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const GET_ORDER_ITEMS = 'GET_ORDER_ITEMS'
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
export const getOrderItems = order => {
  return {
    type: GET_ORDER_ITEMS,
    numItems: order.lineItems.length
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

export const getOrderUser = () => {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/user`)
    dispatch(getOrder(data))
  }
}

export const getOrderGuest = () => {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/guest`)
    dispatch(getOrder(data))
  }
}

export const removeFromCart = (lineItemId, type) => {
  return async dispatch => {
    await axios.delete(`/api/orders/line-items/${lineItemId}`)
    let data
    if(type === 'user'){
      const user = await axios.get('/api/orders/user')
      data = user.data
    } else {
      const guest = await axios.get('/api/orders/guest')
      data = guest.data
    }
    dispatch(getOrder(data))
  }
}

export const newOrder = (order, type) => {
  return async dispatch => {
    await axios.post(`/api/orders/`, order)
    let data
    if(type === 'user'){
      const user = await axios.get('/api/orders/user')
      data = user.data
    } else {
      const guest = await axios.get('/api/orders/guest')
      data = guest.data
    }
    dispatch(getOrder(data))
  }
}

export const addToCart = (item, type) => {
  return async dispatch => {
    // axios.get to order
    let prevOrder
    if(type === 'user'){
      prevOrder = await axios.get('/api/orders/user')
    } else {
      prevOrder = await axios.get('/api/orders/guest')
    }
    const prevOrderData = prevOrder.data
    // filter line-items with the same .itemId
    const currLineItem = prevOrderData.lineItems.find(
      lineItem => lineItem.itemId === item.itemId
    )
    // If there is already an item, do an axios.put
    if (currLineItem) {
      // add the new line-item quantity & change line-item
      const newQuantity = Number(currLineItem.quantity) + Number(item.quantity)
      await axios.put(`/api/orders/line-items/${currLineItem.id}`, {
        quantity: newQuantity
      })
    } else {
      // Otherwise, we haven't added this item yet, do an axios.post
      await axios.post(`/api/orders/line-items/`, item)
    }
    let updatedOrder
    if(type === 'user'){
      updatedOrder = await axios.get('/api/orders/user')
    } else {
      updatedOrder = await axios.get('/api/orders/guest')
    }
    dispatch(getOrder(updatedOrder.data))
  }
}

export const orderUpdateConfirmation = (order, orderId) => {
  console.log('put request going in')
  return async dispatch => {
    const {data} = await axios.put(`/api/orders/checkout/${orderId}`, order)
    console.log('put request went in')
    dispatch(getOrder(data))
  } 
}

export const orderUpdate = (order, orderId, type) => {
  return async dispatch => {
    await axios.put(`/api/orders/${orderId}`, order)
    let updatedOrder
    if(type === 'user'){
      updatedOrder = await axios.get('/api/orders/user')
    } else {
      updatedOrder = await axios.get('/api/orders/guest')
    }
    dispatch(getOrder(updatedOrder.data))
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
    case RESET_ORDER:
      return action.selectedOrder
    default:
      return state
  }
}
