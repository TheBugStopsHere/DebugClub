import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS'
// const GET_ITEM = 'GET_ITEM'
// const REMOVE_ITEM = 'REMOVE_ITEM'

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
//this action will receive an an array of items. We will those items to our allItems array.
const getItems = items => {
    console.log('action creator')
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
    console.log('Thunk thunk thunk')
    return async (dispatch) => {
        const {data} = await axios.get('/api/items');
        dispatch(getItems(data));
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
    default:
      return state
  }
}
