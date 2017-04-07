import { connect } from 'react-redux'
import ChatMessages from '../components/ChatMessages'

const getChatMessages = (messages, filter) => {
  switch (filter) {
    case 'MAIN_CHAT':
      return messages
    // TODO: case 'PRIVATE CHAT'':
    //   return todos.filter(t => t.completed)
  }
}

const mapStateToProps = (state) => {
  return {
    messages: getChatMessages(state.chat.messages, 'MAIN_CHAT') //  TODO: replace with state.filter or some alternative
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick: (id) => {
//       dispatch(toggleTodo(id))
//     }
//   }
// }

const Chat = connect(
  mapStateToProps,
  // mapDispatchToProps
)(ChatMessages)

export default Chat
