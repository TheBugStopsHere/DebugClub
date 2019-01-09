import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS'
const GET_ITEM = 'GET_ITEM'

/**
 * INITIAL STATE
 */
//items will need to be accessed as state.item.allItems and state.item.selectedItem
const initialState = {
    allItems: [],
    selectedItem: {}
}

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
//This thunk will fetch the items from the server and will use the getItems action creator to add them to the allItems array on state.
export const getItemsThunk = () => {
    return async (dispatch) => {
        const {data} = await axios.get('/api/items');
        dispatch(getItems(data));
    }
}

//This thunk will fetch the item from the server and will use the getItem action creator to add it to the selectedItem object on state.
export const getItemThunk = (itemId) => {
    console.log('Thunk thunk thunk')
    return async (dispatch) => {
        const {data} = await axios.get(`/api/items/${itemId}`)
        dispatch(getItem(data));
    }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
          ...state,
          allItems: action.allItems
      };
    case GET_ITEM:
      return {
          ...state,
          selectedItem: action.selectedItem
      }
    default:
      return state
  }
}
