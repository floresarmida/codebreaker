import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const initial = {
  messages: []
}

const chat = (state = initial, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state,
        messages: [
          ...state.messages, {
            ...action.data
          }
        ]}
    case 'ADD_OG':
      return { ...state,
        messages: [
          ...state.messages, {
            id: action.id,
            og: action.data
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
