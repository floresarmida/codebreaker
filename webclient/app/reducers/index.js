import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

const initialChat = {
  messages: []
  //  TODO: Multiple chat branches in state
}
const chat = (state = initialChat, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state,
        messages: [
          ...state.messages, {
            text: action.data
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

const initialModal = {
  open: false,
  content: ''
}
function modal (state = initialModal, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        open: true,
        content: action.data
      }
    case 'CLOSE_MODAL':
      return {
        open: false,
        content: action.data
      }
    default:
      return state
  }
}

//  Combine and export
const reducers = {
  chat,
  modal,
  form  // redux-form reducers
}
const rootReducer = combineReducers(reducers)
export default rootReducer
