import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {Footer} from './components/Footer'

const App = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="pageContent">
        <Routes />
        <Footer />
      </div>
    </div>
  )
}

export default App
