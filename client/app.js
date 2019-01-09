import React from 'react'

import { Navbar } from './components'
import AllItems from './components/All-Items';
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <AllItems />
      <Routes />
    </div>
  )
}

export default App
