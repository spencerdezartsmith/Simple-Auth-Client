import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Signup extends Component {
  renderInput(field) {
    const { meta: { touched, error } } = field
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className='form-control'
          type={field.label.includes('Password') ? 'password' : 'text'}
          {...field.input}
        />
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }


  handleFormSubmit(values) {
    const { email, password } = values
    const action = 'signup'
    this.props.verifyUser({ email, password }, action)
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          label='Email'
          name='email'
          component={this.renderInput}
        />
        <Field
          label='Password'
          name='password'
          component={this.renderInput}
        />
        <Field
          label='Confirm Password'
          name='passwordConfirm'
          component={this.renderInput}
        />
        <button type='submit' className='btn btn-primary'>Sign Up!</button>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.email) {
    errors.email = 'Please enter an email'
  }
  if (!values.password) {
    errors.password = 'Please enter a password'
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match!'
  }

  return errors
}

export default reduxForm({
  validate,
  form: 'signup'
})(
  connect(null, actions)(Signup)
)
