import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { connect } from 'react-redux'
import { closeModal } from '../actions'

const NotificationComponent = ({ open = false, close }) => (
  <Dialog
    title='Dialog With Actions'
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
      The actions in this window were passed in as an array of React objects.
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
