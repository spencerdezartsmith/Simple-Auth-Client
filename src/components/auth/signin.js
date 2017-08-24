import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Signin extends Component {
  renderInput(field) {
    return <input {...field.input} type={field.type} className="form-control" />
  }

  handleFormSubmit({ email, password }){
    const action = 'signin'
    this.props.verifyUser({ email, password }, action)
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oh no!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render(){
  const { handleSubmit } = this.props

    return (
      <div>
        {this.renderError()}
        <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <Field name="email" component={this.renderInput} type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <Field name="password" component={this.renderInput} type="password" />
          </div>
          <button action="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signin'
})(
  connect(mapStateToProps, actions)(Signin)
)
