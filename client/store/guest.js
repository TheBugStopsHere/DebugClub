import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_GUEST = 'GET_GUEST'
const UPDATE_INFO = 'UDPATE_INFO'

/**
 * INITIAL STATE
 */
const defaultGuest = {}

/**
 * ACTION CREATORS
 */
const gotGuest = guest => ({type: GET_GUEST, guest})
const updateInfo = (user) => ({type: UPDATE_INFO, user})

/**
 * THUNK CREATORS
 */
export const getGuest = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users/session')
    const response = {
      id: data
    }
    dispatch(gotGuest(response || defaultGuest))
  } catch (err) {
    console.error(err)
  }
}

//this thunk is used to update an existing user who originally signed up as a guest, not using OAuth.
export const updateUserThunk = (formData) => async dispatch => {
  const {data} = await axios.put('api/users', formData)
  dispatch(updateInfo(data))
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
