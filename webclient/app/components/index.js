import React from 'react'

//  MUI Theme Initialization (rather opinionated)
//  http://www.material-ui.com/#/customization/themes
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Theme from '../theme'
const muiTheme = getMuiTheme(Theme)

//  Tap Event Plugin Injection  (required, will remove in @next distro)
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'

import Nav from './Nav'
import Chat from './Chat'
import Footer from './Footer'

class App extends React.Component {
  constructor (props) {
    super(props)
    let mobile = window.innerWidth <= 1024
    this.state = {
      mobile,
      nav: !mobile,
      stream: []
    }
    this.handleResize = this.handleResize.bind(this)
    this.toggleNav = this.toggleNav.bind(this)
    this.handleCall = this.handleCall.bind(this)
  }
  componentWillMount () {
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }
  //  UI Methods (responsive drawer)
  handleResize () {
    let mobile = window.innerWidth <= 1024
    this.setState({ mobile, nav: !mobile })
  }
  toggleNav () {
    let nav = !this.state.nav
    this.setState({ nav })
  }
  //  CRUD ops (very crude traversal, no redux at this point)
  handleCall (data) {
    console.log('Called addContent')
    console.log('Received call', data)
  }

  render () {
    //  Push body content if nav is docked & open on desktops
    const push = this.state.nav && !this.state.mobile ? Theme.drawer.width : 0
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Drawer
            open={this.state.nav}
            docked={!this.state.mobile}
            onRequestChange={this.toggleNav}
            containerStyle={Theme.drawer}
            zDepth={1}
          >
            <Nav handleCall={this.handleCall} />
          </Drawer>
          <div id='body' style={{paddingLeft: push}}>
            <div id='content'>
              <AppBar
                title='ZipCode API'
                onLeftIconButtonTouchTap={this.toggleNav}
                zDepth={2}
              />
              <Chat />
            </div>
            <Footer />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
