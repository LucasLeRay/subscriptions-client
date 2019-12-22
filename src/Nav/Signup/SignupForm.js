import React from 'react'
import { func, shape, string, bool } from 'prop-types'
import Input from '../../commons/Components/Input'
import Button from '../../commons/Components/Button'
import { Form, MarginButton, ErrorWrapper } from './Signup.module.css'

function SignupForm({
  handleSubmit,
  fields,
  handleFieldChange,
  error,
  setError,
  loading,
}) {
  function validateForm() {
    if (fields.email.length === 0) return 'Email is required'
    if (fields.password.length === 0) return 'Password is required'
    if (fields.password !== fields.confirmPassword) {
      return "The two passwords don't match"
    }
    return ''
  }

  return (
    <form
      className={Form}
      onSubmit={e => {
        e.preventDefault()
        const customError = validateForm()
        if (customError) {
          setError(customError)
        } else {
          handleSubmit()
        }
      }}
    >
      <Input
        id="email"
        label={<>E-mail</>}
        type="email"
        value={fields.email}
        onChange={handleFieldChange}
      />
      <Input
        id="password"
        label={<>Password</>}
        type="password"
        value={fields.password}
        onChange={handleFieldChange}
      />
      <Input
        id="confirmPassword"
        label={<>Confirm password</>}
        type="password"
        value={fields.confirmPassword}
        onChange={handleFieldChange}
      />
      <Button loading={loading} className={MarginButton} type="submit">
        Submit
      </Button>
      <span className={ErrorWrapper}>{error}</span>
    </form>
  )
}

SignupForm.propTypes = {
  handleSubmit: func.isRequired,
  fields: shape({
    email: string.isRequired,
    password: string.isRequired,
    confirmPassword: string.isRequired,
  }).isRequired,
  handleFieldChange: func.isRequired,
  error: string.isRequired,
  setError: func.isRequired,
  loading: bool.isRequired,
}

export default SignupForm
