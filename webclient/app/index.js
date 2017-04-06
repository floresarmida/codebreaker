import React from 'react'
import { render } from 'react-dom'

//  Initialize Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
// let store = createStore(stream)
// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const store = createStore(
  //  Root Reducer
  rootReducer,
  //  Enable DevTools in dev node env
  composeWithDevTools(
  //  Apply thunkk middleware to enable async action dispatches
  applyMiddleware(thunk)
))

//    Root App
import App from './components/'

//    TESTING
if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf')
}

//    RENDER
render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'))
