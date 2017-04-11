import React from 'react'

import { connect } from 'react-redux'
import { submitMessage } from '../actions'
import {reset} from 'redux-form'

import ChatMessage from '../components/ChatMessage'
import Composer from '../components/Composer'

import Paper from 'material-ui/Paper'

const ChatContainer = ({messages = [], submit, reset}) => (
  <div>
    <div id='chat'>
      {messages.map((m, i) => (
        <ChatMessage key={i} message={m} />
    ))}
    </div>
    <footer>
      <Paper style={{backgroundColor: '#CFD8DC', padding: '0 16'}}>
        <Composer onSubmit={(e) => submit(e) && reset()} />
      </Paper>
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
    submit: (e) => dispatch(submitMessage(e)),
    reset: () => dispatch(reset('composer'))
  }
}

const Chat = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer)

export default Chat
