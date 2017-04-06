import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { TextField } from 'redux-form-material-ui'

const required = (val) => (val == null ? 'Required' : undefined)

class Form extends Component {
  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field name='city' component={TextField} hintText='City'
          validate={required}
      />
        <button type='submit' disabled={submitting}>Submit</button>
        <button type='button' disabled={pristine || submitting} onClick={reset}>Clear</button>
      </form>
    )
  }
}

// Decorate the form component
let LinkForm = reduxForm({
  form: 'messagebox' // a unique name for this form
})(Form)

export default LinkForm
