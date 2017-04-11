import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { dialogReducer } from 'redux-dialog'

const initialChat = {
  messages: []
  //  TODO: Multiple chat branches in state
  // 'MAIN': {
  //   messages: []
  // }
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
  open: false
}
function modal (state = initialModal, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { open: true }
    case 'CLOSE_MODAL':
      return { open: false }
    default:
      return state
  }
}

//  Combine and export
const reducers = {
  chat,
  modal,
  form: formReducer,     // redux-form dependency
  dialogReducer //  redux-dialog
}
const rootReducer = combineReducers(reducers)
export default rootReducer
