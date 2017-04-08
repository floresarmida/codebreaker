import React from 'react'

import { connect } from 'react-redux'
import { submitMessage } from '../actions'

import ChatMessage from '../components/ChatMessage'
import Composer from '../components/Composer'

const ChatContainer = ({messages, submit}) => (
  // <div>
    <div id='content'>
      {/* TODO: Map chatmessages here */}
      <ChatMessage />
    {/* </div> */}
    <footer>
      <Composer onSubmit={(e) => submit(e)} />
    </footer>
  </div>
)

//  Change chat messages received in state based on room
const getChatMessages = (messages, room) => {
  switch (room) {
    case 'MAIN':
      return messages
    // TODO: case 'PRIVATE CHAT'':
    //   return todos.filter(t => t.completed)
  }
}

const mapStateToProps = (state) => {
  let room = 'MAIN'
  //  TODO: State check of the selectedRoom in state
  return {
    messages: getChatMessages(state.chat.messages, room)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (e) => dispatch(submitMessage(e))
  }
}

const Chat = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer)

export default Chat
