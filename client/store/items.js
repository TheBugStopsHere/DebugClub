import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS'

/**
 * INITIAL STATE
 */
//items will need to be accessed as state.item.allItems and state.item.selectedItem
const allItems = []

/**
 * ACTION CREATORS
 */
//this action will receive an an array of items. We will set those items as our allItems array.
const getItems = items => {
    return(
        {
            type: GET_ITEMS, 
            allItems: items
        }
    )
}

/**
 * THUNK CREATORS
 */
//This thunk will fetch the items from the server and will use the getItems action creator to add them to the allItems array on state.
export const getItemsThunk = () => {
    return async (dispatch) => {
        const {data} = await axios.get('/api/items');
        dispatch(getItems(data));
    }
}

/**
 * REDUCER
 */
export default function(state = allItems, action) {
  switch (action.type) {
    case GET_ITEMS:
      return action.allItems;
    default:
      return state
  }
}
