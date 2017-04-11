import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import Send from 'material-ui/svg-icons/content/send'

class Form extends Component {
  render () {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field name='composer' component={TextField}
          floatingLabelText='Say something!'
          floatingLabelStyle={{color: 'rgb(33, 150, 243)'}}
          style={{
            width: 'calc(100% - 100px)'
          }}
        />
        <RaisedButton type='submit' icon={<Send />}
          secondary disabled={pristine || submitting}
          style={{
            marginBottom: 8,
            display: 'inline-block',
            verticalAlign: 'bottom'
          }}
        />
      </form>
    )
  }
}

let MessageBox = reduxForm({
  form: 'composer'  // Identifier
})(Form)
export default MessageBox
