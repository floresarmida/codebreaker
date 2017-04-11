import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import Send from 'material-ui/svg-icons/content/send'

class Form extends Component {
  // const required = (val) => (val == null ? 'Required' : undefined)
  render () {
    const { handleSubmit, pristine, submitting } = this.props
    // const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field name='composer' component={TextField}
          floatingLabelText='Say something!'
          floatingLabelStyle={{color: 'rgb(33, 150, 243)'}}
          style={{display: 'inline-block'}}
          // fullWidth
          multiLine rowsMax={2}
        />
        <RaisedButton type='submit' icon={<Send />}
          secondary disabled={pristine || submitting}
          style={{margin: 8, display: 'inline-block', verticalAlign: 'bottom'}}
        />
      </form>
    )
  }
}

// Decorate the form component
let MessageBox = reduxForm({
  form: 'composer' // a unique name for this form
})(Form)

export default MessageBox
