/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getItemsThunk} from '../../client/store/items'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../../client/history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {items: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getItemThunk', () => {
    it('eventually dispatches the GET ITEMS action', async () => {
      const fakeItems = [{name: 'Bumblebee', price: 7500, id: 1}, {name: 'Grasshopper', price: 500, id: 2}]
      mockAxios.onGet('/api/items').replyOnce(200, fakeItems)
      await store.dispatch(getItemsThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ITEMS')
    })
  })
})
