import React from 'react'

import { connect } from 'react-redux'
import { submitMessage } from '../actions'

import ChatMessage from '../components/ChatMessage'
import Composer from '../components/Composer'

const ChatContainer = ({messages, submit}) => (
  <div id='chat'>
    {/* TODO: Map chatmessages here */}
    <ChatMessage />
    <footer>
      <Composer onSubmit={(e) => submit(e)} />
    </footer>
  </div>
)

const mapStateToProps = (state) => {
  let room = 'MAIN'
  //  TODO: State check of the selectedRoom in state
  switch (room) {
    case 'MAIN':
      return state.chat // .messages
      // return state.chat[room].messages
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
