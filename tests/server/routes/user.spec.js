/* global describe beforeEach it */

const {expect} = require('chai')
const supertest = require('supertest')
const db = require('../../../server/db')
const app = require('../../../server/index')
// const agent = supertest.agent(app)
const User = db.model('user')

describe('User api routes', () => {
  const fakeClient = supertest(app)
  let bug
  let bigBigJoe = {
    firstName: 'Joe',
    lastName: 'Green',
    email: 'bigbug@email.com',
    id: 5
  }

  beforeEach(() => db.sync({force: true}))
  beforeEach(async () => {
    bug = await User.create({
      firstName: 'Joe',
      lastName: 'Green',
      email: 'bigbug@email.com',
      id: 5
    })
    // return db.sync({force: true})
  })

  it('gets all users', async () => {
    const res = await fakeClient.get('/api/users')
    expect(res.body).to.be.an('array')
    expect(res.body[0].id).to.be.equal(5)
  }) // end describe('gets all uers')

}) // end describe('User routes')
