'use strict'

const db = require('../server/db')
const { User, Item } = require('../server/db/models')

const usersData = [
  {
    firstName: 'YourName',
    lastName: 'User',
    imageURL: '',
    address: '',
    email: 'user@example.com',
    password: 'user',
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
  },
]

const itemsData = [
  {
    name: 'Bumblebee',
    imageURL: 'https://irp-cdn.multiscreensite.com/ed883b94/dms3rep/multi/mobile/a53e985a43c4489dabf6c38d196501e9-608x681.dm.edit_rRHlBn.jpg',
    price: 3.50,
    description: 'A bumblebee (or bumble bee, bumble-bee or humble-bee) is any of over 250 species in the genus Bombus, part of Apidae, one of the bee families.',
    category: 'live bugs'
  },
  {
    name: 'Cricket',
    imageURL: 'https://media.istockphoto.com/vectors/cartoon-cute-green-cricket-isolated-on-white-background-vector-id493601100?k=6&m=493601100&s=612x612&w=0&h=HTTxeQpYiLfrT8yQITjTB0vWlYjPBebClfv6_S9QR3I=',
    price: 1.99,
    description: 'Crickets (also known as "true crickets"), of the family Gryllidae, are insects related to bush crickets, and, more distantly, to grasshoppers.',
    category: 'live bugs'
  },
  {
    name: 'Mosquito',
    imageURL: 'http://static-18.sinclairstoryline.com/resources/media/dc4ac45e-d04f-4c4d-b692-3d6f5a47af7c-large16x9_1280x960_61216P00MYXOA.png?1538048582493',
    price: 3.50,
    description: 'Mosquitoes (alternate spelling mosquitos) are a group of about 3500 species of small insects that are a type of fly (order Diptera). Within that order they constitute the family Culicidae (from the Latin culex meaning "gnat").',
    category: 'live bugs'
  },
  {
    name: 'Live Bug Holder',
    price: 9.99,
    description: 'description',
    category: 'live bugs'
  },
  {
    name: 'CryptoLocker',
    imageURL: 'https://cdn.arstechnica.net/wp-content/uploads/2013/11/CryptoLocker_20131120_Bitcoin-640x496.png',
    price: 7500.00,
    description: "Released in September 2013, CryptoLocker spread through email attachments and encrypted the user’s files so that they couldn’t access them. The hackers then sent a decryption key in return for a sum of money, usually somewhere from a few hundred dollars up to a few grand.",
    category: 'bad bugs'
  },
  {
    name: 'ILOVEYOU',
    imageURL: 'https://people.carleton.edu/~brodiej/example2.gif',
    price: 250.00,
    description: 'ILOVEYOU is one of the most well-known and destructive viruses of all time. In 2000, The virus came in an email with a subject line that said “I love you”. The malware was a worm that was downloaded by clicking on an attachment called "LOVE-LETTER-FOR-YOU.TXT.vbs". ILOVEYOU overwrote system files and personal files and spread itself over and over and over again.',
    category: 'bad bugs'
  },
  {
    name: 'MyDoom',
    imageURL: 'http://virus.wdfiles.com/local--files/mydoom/Mydomess.png',
    price: 3.50,
    description: 'MyDoom is considered to be the most damaging virus and fastest-spreading email-based worm ever. It launched Distributed Denial of Service attacks against tech companies like SCO, Microsoft, and Google. In 2004, roughly somewhere between 16-25% of all emails had been infected by MyDoom.',
    category: 'bad bugs'
  },
  {
    name: 'Bad Bug Holder',
    price: 9.99,
    description: 'description',
    category: 'bad bugs'
  },
  {
    name: 'Raid',
    imageURL: 'https://www.lumierehealingcenters.com/wp-content/uploads/2018/07/RAID-245x300.jpg',
    price: 5.99,
    description: 'Kills bugs dead.',
    category: 'debugging'
  },
  {
    name: 'Chrome Dev Tools',
    imageURL: 'https://lh3.googleusercontent.com/GjX6Q3_FVJfc0DqE2wiPKkgOfth6otzV-D7GV-wB6sH5_t1oodMaHOBLsYOLeydb85bKWu6X=w640-h400-e365',
    price: 0.99,
    description: 'Chrome DevTools is a set of web developer tools built directly into the Google Chrome browser. DevTools can help you edit pages on-the-fly and diagnose problems quickly, which ultimately helps you build better websites, faster.',
    category: 'debugging'
  },
  {
    name: 'McAfee',
    imageURL: 'https://assets.pcmag.com/media/images/487974-mcafee-logo.png?width=810&height=456',
    price: 0.00,
    description: "Everyone's favorite default software.",
    category: 'debugging'
  },
  {
    name: 'Debug Holder',
    price: 9.99,
    description: 'description',
    category: 'debugging'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  for (const user of usersData) {
    await User.create(user);
  }
  console.log(`seeded ${usersData.length} users`)
  
  for (const item of itemsData) {
    await Item.create(item);
  }
  console.log(`seeded ${itemsData.length} items`)
  
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
