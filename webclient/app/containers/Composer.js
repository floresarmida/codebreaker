import React from 'react'

import { connect } from 'react-redux'
import { addLink } from '../actions'

import LinkForm from '../components/LinkForm'

let Composer = ({ dispatch }) => {
  return (
    <div>
      <LinkForm onSubmit={(e) => dispatch(addLink(e))} />
    </div>
  )
}
Composer = connect()(Composer)

export default Composer
