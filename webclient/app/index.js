import React from 'react'
import { render } from 'react-dom'

//  Initialize Redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
// let store = createStore(stream)
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

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
