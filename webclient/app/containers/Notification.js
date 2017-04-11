import React from 'react'

import { connect } from 'react-redux'
import { closeModal } from '../actions'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const NotificationComponent = ({ open, content, close }) => (
  <Dialog
    title='Some news to share...'
    actions={[
      <FlatButton
        label='Close'
        primary
        onTouchTap={() => close()}
            />
    ]}
    modal={false}
    open={open}
    onRequestClose={() => close()}
    >
      {content instanceof Error ? content.toString() : content}
  </Dialog>
)

const mapStateToProps = (state) => {
  return state.modal
}
const mapDispatchToProps = (dispatch) => {
  return {
    close: (e) => dispatch(closeModal())
  }
}
const Notification = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationComponent)
export default Notification
