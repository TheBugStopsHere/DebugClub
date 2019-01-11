import React from 'react'
import {Navbar} from './components'
import Sidebar from 'react-sidebar'
import Routes from './routes'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: true
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ 
      sidebarOpen: open 
    });
  }

  render()  {
    return (
      <div className="container-fluid">
        <Navbar />

        <Sidebar
        sidebar={<b>Sidebar content</b>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
        >
        <button onClick={() => this.onSetSidebarOpen(true)}>
          M
        </button>
        </Sidebar>

        <div className="pageContent">
          <Routes />
        </div>
      </div>
    )
  }

}

export default App
