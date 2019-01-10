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
  let roo = {
    name: 'roo',
    price: 1000000
  }

  beforeEach(() => db.sync({force: true}))
  beforeEach(async () => {
    riley = await Item.create({
      name: 'Riley',
      price: 1000000
    })
    // return db.sync({force: true})
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

  /* 
  ADMIN routes: 
  post, put, delete:
  */

  it('creates an item', function(done) {
    request(app)
      .post('/api/items')
      .send(roo)
      .expect(function(res) {
        res.body.name = 'Roo'
      })
      .expect(201, done)
  })

  // ADMIN route: put/items/:itemId
  // ADMIN route: del/items/:itemId
}) // end describe('Item routes')
