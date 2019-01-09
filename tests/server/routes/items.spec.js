/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const supertest = require('supertest')
const db = require('../../../server/db')
const app = require('../../../server/index')
const Item = db.model('item')

describe('Item api routes', () => {
  const fakeClient = supertest(app)

  beforeEach(() => db.sync({force: true}))
  beforeEach(async () => {
    await Item.create({
      name: 'Riley',
      price: 1000000
    })
  })

  it('gets all items', async () => {
    const res = await fakeClient.get('/api/items')
    expect(res.body).to.be.an('array')
    expect(res.body[0].name).to.be.equal('Riley')
  }) // end describe('gets all items')
}) // end describe('Item routes')
