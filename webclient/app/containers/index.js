import React from 'react'

//  MUI Theme Initialization (rather opinionated)
//  http://www.material-ui.com/#/customization/themes
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Theme from '../theme'
const muiTheme = getMuiTheme(Theme)
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

//  Tap Event Plugin Injection  (required, will remove in @next distro of material-ui)
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'

import QueryWindow from './QueryWindow'
import Nav from './Nav'
//  Errors and other modals will be triggered via dispatch
import Notification from './Notification'

class App extends React.Component {
  constructor (props) {
    super(props)
    //  For sake of reuse in other projects, App.JS is agnostic to state mgmnt
    let mobile = window.innerWidth <= 1024
    this.state = { mobile, nav: !mobile }
    this.handleResize = this.handleResize.bind(this)
    this.toggleNav = () => this.setState({ nav: !this.state.nav })
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

  render () {
    //  Push body content if nav is docked & open on desktops
    const push = this.state.nav && !this.state.mobile ? Theme.drawer.width : 0
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Drawer
            open={this.state.nav} onRequestChange={this.toggleNav}
            docked={!this.state.mobile}
            containerStyle={Theme.drawer} zDepth={1}
          >
            <Nav />
          </Drawer>
          {/* Notifications (error etc) mount here, trigger via dispatch */}
          <Notification />
          <div id='body' style={{paddingLeft: push}}>
            <AppBar
              title='Slouch Chat'
              onLeftIconButtonTouchTap={this.toggleNav}
              style={Theme.appBar} zDepth={2}
              />
            <QueryWindow />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
