import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_GUEST = 'GET_GUEST'

/**
 * INITIAL STATE
 */
const defaultGuest = {}

/**
 * ACTION CREATORS
 */
const gotGuest = guest => ({type: GET_GUEST, guest})

/**
 * THUNK CREATORS
 */
export const getGuest = () => async dispatch => {
  try {
    const {data} = await axios.get('/users/session')
    const response = {
      id: data
    }
    dispatch(gotGuest(response || defaultGuest))
  } catch (err) {
    console.error(err)
  }
}


/**
 * REDUCER
 */
export default function(state = defaultGuest, action) {
  switch (action.type) {
    case GET_GUEST:
      return action.guest
    default:
      return state
  }
}
