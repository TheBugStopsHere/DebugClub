/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const supertest = require('supertest')
const db = require('../../../server/db')
const app = require('../../../server/index')
// const agent = supertest.agent(app)
const Item = db.model('item')

describe('Item api routes', () => {
  const fakeClient = supertest(app)
  let riley

  beforeEach(() => db.sync({force: true}))
  beforeEach(async () => {
    riley = await Item.create({
      name: 'Riley',
      price: 1000000
    })
  })

  it('gets all items', async () => {
    const res = await fakeClient.get('/api/items')
    expect(res.body).to.be.an('array')
    expect(res.body[0].name).to.be.equal('Riley')
  }) // end describe('gets all items')

  it('gets a single item', async () => {
    const res = await fakeClient.get(`/api/items/${riley.dataValues.id}`)
    expect(res.body.id).to.be.equal(1)
  }) // end describe('gets a single item')

  // ADMIN routes TBD:
  // post/items

  it('creates an item', async () => {
    const res = await fakeClient.post(`/api/items`, riley)
    console.log(res.body)
    // expect(res.body.id).to.be.equal(1)
  }) // end describe('creates an item')

  // put/items/:itemId
  // del/items/:itemId
}) // end describe('Item routes')
