/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../../../server/db/index')
const Item = db.model('item')

describe('Item model', () => {
  beforeEach(() => db.sync({force: true}))

  describe('column definitions', () => {
    let bumblebee
    beforeEach(async () => {
      bumblebee = await Item.create({
        name: 'Bumblebee',
        imageURL:
          'https://irp-cdn.multiscreensite.com/ed883b94/dms3rep/multi/mobile/a53e985a43c4489dabf6c38d196501e9-608x681.dm.edit_rRHlBn.jpg',
        price: parseInt(3.5).toFixed(2),
        description:
          'A bumblebee (or bumble bee, bumble-bee or humble-bee) is any of over 250 species in the genus Bombus, part of Apidae, one of the bee families.',
        category: 'live bugs'
      })
    })

    it('has correct `name` property', async () => {
      expect(bumblebee.name).to.equal('Bumblebee')
    })

    it('has correct `imageURL` property', async () => {
      expect(bumblebee.imageURL).to.equal(
        'https://irp-cdn.multiscreensite.com/ed883b94/dms3rep/multi/mobile/a53e985a43c4489dabf6c38d196501e9-608x681.dm.edit_rRHlBn.jpg'
      )
    })

    it('has correct `price` property', async () => {
      expect(bumblebee.price).to.equal(parseInt(3.5).toFixed(2))
    })

    it('has correct `description` property', async () => {
      expect(bumblebee.description).to.equal(
        'A bumblebee (or bumble bee, bumble-bee or humble-bee) is any of over 250 species in the genus Bombus, part of Apidae, one of the bee families.'
      )
    })

    it('has correct `category` property', async () => {
      expect(bumblebee.category).to.equal('live bugs')
    })

    // it('`name` is required', async () => {
    //   const coffee = Coffee.build()
    //   return coffee.validate().then(
    //     () => {
    //       throw new Error('Validation should have failed!')
    //     },
    //     err => {
    //       expect(err).to.be.an('error')
    //     }
    //   )
    // })
  })
}) // end describe('User model')
