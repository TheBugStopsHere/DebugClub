// /* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../../../server/db/index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      describe('correctFirstName', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'coDy',
          lastName: 'coDerSoN',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })

      it('has correct `name` property', () => {
        expect(cody.firstName).to.equal('Cody')
      })

      }) //end describe ('correctName')
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
