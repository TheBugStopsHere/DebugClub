import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS'
const GET_ITEM = 'GET_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

/**
 * INITIAL STATE
 */
const initialState = {
    allItems: [],
    selectedItem: {}
}

/**
 * ACTION CREATORS
 */
//this action will receive an an array of items. We will those items to our allItems array.
const getItems = items => (
        {
            type: GET_ITEMS, 
            allItems: items
        }
    )


/**
 * THUNK CREATORS
 */
export const getItemsThunk

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
