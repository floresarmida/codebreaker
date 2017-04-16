import React from 'react'

import { connect } from 'react-redux'
import { decodeCaesar } from '../actions'
//  Reset is called by submission (async via thunk)

import OpenGraphMessage from '../components/OpenGraphMessage'
import ChatMessage from '../components/ChatMessage'
import Composer from '../components/Composer'

import Paper from 'material-ui/Paper'

const Container = ({messages = [], submit}) => (
  <div>
    <div id='chat'>
      {messages.map((m, i) => (
        //  Conditional render based on content type
        <div key={i}>
          {m.og && <OpenGraphMessage {...m.og} source={m.source} />}
          {m.message && <ChatMessage message={m.message} />}
        </div>

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
    submit: (e) => dispatch(decodeCaesar(e))
  }
}
const ComposerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
export default ComposerContainer
