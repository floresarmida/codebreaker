import React from 'react'
import { render } from 'react-dom'

//  Initialize Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
//  Create store from reducers, enable devtools, apply thunk middleware (enables async dispatches)
const store = createStore(
  rootReducer,
  composeWithDevTools(
  applyMiddleware(thunk)
))

//    Testing
if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf')
}

//    Import App
import App from './components/'

//    RENDER
render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'))
