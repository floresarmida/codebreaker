import React from 'react'

import { connect } from 'react-redux'
import { uploadLink } from '../actions'

import LinkShareForm from '../components/LinkShareForm'

let Composer = ({ dispatch }) => {
  return (
    <div>
      <LinkShareForm onSubmit={(e) => dispatch(uploadLink(e))} />
      {/* <div>TODO: Message box here</div> */}
    </div>
  )
}
Composer = connect()(Composer)

export default Composer
