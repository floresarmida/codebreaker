import React from 'react'

import { connect } from 'react-redux'
import { submitMessage } from '../actions'

import MessageBox from '../components/MessageBox'

let Composer = ({ dispatch }) => {
  return (
    <div>
      <MessageBox onSubmit={(e) => dispatch(submitMessage(e))} />
      {/* <div>TODO: Message box here</div> */}
    </div>
  )
}
Composer = connect()(Composer)

export default Composer
