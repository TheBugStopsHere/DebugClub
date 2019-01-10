import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="pageContent">
        <Routes />
      </div>
    </div>
  )
}

export default App
