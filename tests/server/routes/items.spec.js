/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const supertest = require('supertest')
const db = require('../../../server/db')
const app = require('../../../server/index')
const Item = db.model('item')

describe('Item routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/items/', () => {
    const fakeClient = supertest(app)
    const rileysEmail = 'roo@doggo.com'

    beforeEach(async () => {
      await Item.create({
        name: 'Riley',
        email: rileysEmail,
        price: 1000000
      })
    })

    // it('GET /api/items', async () => {
    //   const res = await request(app)
    //     .get('/api/items')
    //     .expect(200)

    //   expect(res.body).to.be.an('array')
    //   expect(res.body[0].email).to.be.equal(rileysEmail)
    // })

    it('GET /api/items', async () => {
      const res = await fakeClient.get('/api/items')
      console.log(res)
      // expect(res.body).to.be.an('array')
      // expect(res.body[0].email).to.be.equal(rileysEmail)
    })
  }) // end describe('/api/items')
}) // end describe('Item routes')
