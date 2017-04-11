import React from 'react'

import { connect } from 'react-redux'
import { submitMessage } from '../actions'
//  Reset is called by submission (async via thunk)

import ChatMessage from '../components/ChatMessage'
import Composer from '../components/Composer'

import Paper from 'material-ui/Paper'

const ChatContainer = ({messages = [], submit}) => (
  <div>
    <div id='chat'>
      {messages.map((m, i) => (
        <ChatMessage key={i} message={m} />
    ))}
    </div>
    <footer>
      <Paper style={{backgroundColor: '#CFD8DC', padding: '0 16'}}>
        <Composer onSubmit={(e) => submit(e)} />
      </Paper>
    </footer>
  </div>
)

const mapStateToProps = (state) => {
  let room = 'MAIN'
  switch (room) {
    case 'MAIN':
      return state.chat
      //  Future: messages property of chat
  }
  //  TODO: State check of the selectedRoom in state
  // return state.chat[room].messages
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
