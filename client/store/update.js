import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const UPDATE_INFO = 'UDPATE_INFO'

/**
 * INITIAL STATE
 */
const user = {}

/**
 * ACTION CREATORS
 */
//receives user's information and puts it on state to show the user their current info (mainly used for updating).
const getUser = user => ({type: GET_USER, user})

/**
 * THUNK CREATORS
 */

//this thunk is used to get an existing user who originally signed up manually, not using OAuth.
export const getUserThunk = () => async dispatch => {
  const {data} = await axios.get('api/users/find')
  dispatch(getUser(data))
}

//this thunk is used to update an existing user who originally signed up as a guest, not using OAuth.
export const updateUserThunk = (formData) => async dispatch => {
  const {data} = await axios.put('api/users', formData)
  dispatch(getUser(data))
}


/**
 * REDUCER
 */
export default function(state = user, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case UPDATE_INFO:
      return action.user
    default:
      return state
  }
}
