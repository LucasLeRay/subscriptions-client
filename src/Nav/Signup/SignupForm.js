import React from 'react'
import { func, shape, string } from 'prop-types'
import Input from '../../commons/Components/Input'
import Button from '../../commons/Components/Button'
import { Form, MarginButton } from './Signup.module.css'

function SignupForm({ handleSubmit, fields, handleFieldChange }) {
  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    )
  }

  return (
    <form className={Form} onSubmit={handleSubmit}>
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
      <Button className={MarginButton} type="submit" disabled={!validateForm()}>
        Submit
      </Button>
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
}

export default SignupForm
