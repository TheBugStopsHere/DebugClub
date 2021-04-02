'use strict'

const db = require('../server/db')
const {User, Item, Order, LineItem} = require('../server/db/models')

const ordersData = require('./ordersData.json')
const lineItemsData = require('./lineItemsData.json')

const usersData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    imageURL: '',
    address: '',
    email: 'user@example.com',
    password: 'user',
    admin: false
  },
  {
    firstName: 'Betty',
    lastName: 'Bear',
    imageURL: '',
    address: '',
    email: 'person@email.com',
    password: 'password',
    admin: false
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    imageURL: '',
    address: '',
    email: 'admin@example.com',
    password: 'admin',
    admin: true
  }
]

const itemsData = [
  {
    name: 'Bumblebee',
    imageURL:
      'https://www.planetnatural.com/wp-content/uploads/2012/12/bumblebees-pollinator.jpg',
    price: 350,
    description:
      'A bumblebee (or bumble bee, bumble-bee or humble-bee) is any of over 250 species in the genus Bombus, part of Apidae, one of the bee families.',
    category: 'live bugs',
    inStock: 10
  },
  {
    name: 'Cricket',
    imageURL:
      '/img/cricket.png',
    price: 199,
    description:
      'Crickets (also known as "true crickets"), of the family Gryllidae, are insects related to bush crickets, and, more distantly, to grasshoppers.',
    category: 'live bugs',
    inStock: 5
  },
  {
    name: 'Mosquito',
    imageURL:
      'https://cdn.shopify.com/s/files/1/1420/5180/files/Mosquito-Home-Page_2048x.jpg?v=1538422467',
    price: 350,
    description:
      'Mosquitoes (alternate spelling mosquitos) are a group of about 3500 species of small insects that are a type of fly (order Diptera). Within that order they constitute the family Culicidae (from the Latin culex meaning "gnat").',
    category: 'live bugs',
    inStock: 0
  },
  {
    name: 'Live Bug Holder',
    price: 999,
    description: 'description',
    category: 'live bugs',
    inStock: 100
  },
  {
    name: 'CryptoLocker',
    imageURL:
      '/img/cryptolocker.png',
    price: 750000,
    description:
      'Released in September 2013, CryptoLocker spread through email attachments and encrypted the user’s files so that they couldn’t access them. The hackers then sent a decryption key in return for a sum of money, usually somewhere from a few hundred dollars up to a few grand.',
    category: 'bad bugs',
    inStock: 3
  },
  {
    name: 'ILOVEYOU',
    imageURL:
      'https://www.jesseweb.com/wp-content/uploads/2010/01/ILoveYouVirus1-150x150.gif',
    price: 25000,
    description:
      'ILOVEYOU is one of the most well-known and destructive viruses of all time. In 2000, The virus came in an email with a subject line that said “I love you”. The malware was a worm that was downloaded by clicking on an attachment called "LOVE-LETTER-FOR-YOU.TXT.vbs". ILOVEYOU overwrote system files and personal files and spread itself over and over and over again.',
    category: 'bad bugs',
    inStock: 0
  },
  {
    name: 'MyDoom',
    imageURL:
      '/img/mydoom.jpeg',
    price: 350,
    description:
      'MyDoom is considered to be the most damaging virus and fastest-spreading email-based worm ever. It launched Distributed Denial of Service attacks against tech companies like SCO, Microsoft, and Google. In 2004, roughly somewhere between 16-25% of all emails had been infected by MyDoom.',
    category: 'bad bugs',
    inStock: 2
  },
  {
    name: 'Bad Bug Holder',
    price: 999,
    category: 'bad bugs',
    inStock: 4
  },
  {
    name: 'Raid',
    imageURL:
      'https://images.uline.com/is/image//content/dam/images/HD/HD7500/HD10_7094_US.jpg?$UtilityRHD$&iccEmbed=1&icc=AdobeRGB',
    price: 599,
    description: 'Kills bugs dead.',
    category: 'debugging',
    inStock: 5
  },
  {
    name: 'Chrome Dev Tools',
    imageURL:
      'https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/067/square_480/EGH_Chrome_Sources_Final.png',
    price: 99,
    description:
      'Chrome DevTools is a set of web developer tools built directly into the Google Chrome browser. DevTools can help you edit pages on-the-fly and diagnose problems quickly, which ultimately helps you build better websites, faster.',
    category: 'debugging',
    inStock: 10
  },
  {
    name: 'MacAfee',
    imageURL: 'https://avatars1.githubusercontent.com/u/1475915?s=200&v=4',
    price: 0,
    description: "Everyone's favorite default software.",
    category: 'debugging',
    inStock: 999
  },
  {
    name: 'Debug Holder',
    price: 999,
    category: 'debugging',
    inStock: 0
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  for (const user of usersData) {
    await User.create(user)
  }
  console.log(`seeded ${usersData.length} users`)

  for (const item of itemsData) {
    await Item.create(item)
  }
  console.log(`seeded ${itemsData.length} items`)

  for (const order of ordersData) {
    await Order.create(order)
  }
  console.log(`seeded ${ordersData.length} orders`)

  for (const lineItem of lineItemsData) {
    await LineItem.create(lineItem)
  }
  console.log(`seeded ${lineItemsData.length} lineItems`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
