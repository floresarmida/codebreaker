import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const initial = {
  messages: [],
  api: {
    protocol: 'http://',
    host: '138.68.249.21',  // Name: info-ocean
    version: 'v1',
    services: {
      summary: 'summary'
    }
  }
}

const chat = (state = initial, action) => {
  switch (action.type) {
    case 'ADD_LINK':
      return { ...state,
        messages: [
          ...state.messages, {
            id: action.id,
            data: action.data
          }
        ]}
    default:
      return state
  }
}

//  Combine and export
const reducers = {
  chat,
  form: formReducer     // redux-form dependency
}
const rootReducer = combineReducers(reducers)
export default rootReducer
