import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ITEM = 'GET_ITEM'

/**
 * INITIAL STATE
 */
//items will need to be accessed as state.item.allItems and state.item.selectedItem
const selectedItem = {}

/**
 * ACTION CREATORS
 */
//this action will receive an item object. We will set the item as our selected item object
const getItem = item => {
    // console.log('action creator initiated')
    return(
        {
            type: GET_ITEM, 
            selectedItem: item
        }
    )
}

/**
 * THUNK CREATORS
 */
//This thunk will fetch the item from the server and will use the getItem action creator to add it to the selectedItem object on state.
export const getItemThunk = (itemId) => {
    return async (dispatch) => {
        const {data} = await axios.get(`/api/items/${itemId}`)
        dispatch(getItem(data));
    }
}

/**
 * REDUCER
 */
export default function(state = selectedItem, action) {
  switch (action.type) {
    case GET_ITEM:
      return action.selectedItem
    default:
      return state
  }
}
